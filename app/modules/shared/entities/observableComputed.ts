import { ObservableBase } from "./internal/observableBase";
import { ValueAccessor } from '../interfaces/internal/valueAccessor';
import type { ObservableTrackingContext } from '../interfaces/internal/observableTrackingContext';
import type { ValueReader } from '../interfaces/internal/valueReader';
import { ObservableTrackingContextBase } from './internal/observableTrackingContextBase';
import type { EventBus } from '../interfaces/eventBus';
import type { Observable } from '../interfaces/observable';
import type { Action } from '../types/action';
import type { Func } from '../types/func';
import { DestroyedException } from '../exceptions/destroyedException';
import type { EffectsContainer } from '../interfaces/effectsContainer';
import { EffectsContainerImpl } from './effectsContainerImpl';
import { ValueAccessorDefaulted } from './valueAccessorDefaulted';

export class ObservableComputed<T> extends ObservableBase<T>
{
    private state: ObservableComputedState<T>;
    private states: Record<ObservableComputedStateType, Func<ObservableComputedState<T>>>;
    private effectsContainer = new EffectsContainerImpl();

    get value()
    {
        return this.state.value;
    }

    constructor(private factory: () => T)
    {
        super();

        const observableComputed = this;
        const valueAccessor = new ValueAccessorDefaulted(this.factory);

        const stateReader = {
            get value()
            {
                return observableComputed.state;
            }
        };

        const contextAccessor = {
            get value()
            {
                return observableComputed.context;
            },

            set value(value)
            {
                observableComputed.context = value;
            }
        };

        const dependencies = new Set<Observable<any>>();

        this.states = {
            [ObservableComputedStateType.sleeping]: () => new ObservableComputedStateSleeping(this.factory, this, this.eventbus),
            [ObservableComputedStateType.active]: () => new ObservableComputedStateActive(this.factory, stateReader, valueAccessor, contextAccessor, dependencies, this.effectsContainer, this, this.eventbus),
            [ObservableComputedStateType.computing]: () => new ObservableComputedStateComputing(this.factory, stateReader, valueAccessor, contextAccessor, dependencies, this.effectsContainer, this, this.eventbus),
            [ObservableComputedStateType.destroyed]: () => new ObservableComputedStateDestroyed(),
        };

        this.state = this.states[ObservableComputedStateType.sleeping]();
    }

    override subscribe(handler: Action<[T]>): Action
    {
        return this.state.subscribe(handler);
    }

    override destroy(): void
    {
        this.state.destroy();
        this.effectsContainer.destroy();
    }

    setState(stateType: ObservableComputedStateType)
    {
        this.state = this.states[stateType]();
    }
}

enum ObservableComputedStateType
{
    sleeping = 0,
    active = 1,
    computing = 2,
    destroyed = 3,
}

abstract class ObservableComputedState<T>
{

    abstract get value(): T;

    abstract recompute(): void;
    abstract subscribe(handler: Action<[T]>): Action;
    abstract handleChange(): void;
    abstract destroy(): void;
}

abstract class ObservableComputedStateBase<T> implements ObservableComputedState<T>
{
    abstract get value(): T;

    constructor(
        protected observableComputed: ObservableComputed<T>,
        protected eventbus: EventBus<T>,
    )
    {

    }

    recompute(): void
    {

    }

    subscribe(handler: Action<[T]>): Action
    {
        const unsubscribe = this.eventbus.subscribe(handler);

        this.handleSubscribe();

        return () =>
        {
            unsubscribe();
            this.handleUnsubscribe();
        };
    }

    handleChange(): void
    {

    }

    destroy(): void
    {
        this.handleDestroy();
        this.observableComputed.setState(ObservableComputedStateType.destroyed);
    }

    protected handleSubscribe()
    {

    }

    protected handleUnsubscribe()
    {

    }

    protected handleDestroy()
    {
        this.eventbus.destroy();
    }
}

class ObservableComputedStateWithTracking<T> extends ObservableComputedStateBase<T>
{
    override get value(): T
    {
        return this.valueAccessor.value;
    }

    constructor(
        protected factory: Func<T>,
        protected stateReader: ValueReader<ObservableComputedState<T>>,
        protected valueAccessor: ValueAccessor<T>,
        protected contextAccessor: ValueAccessor<ObservableTrackingContext | undefined>,
        protected dependencies: Set<Observable<any>>,
        protected effectsContainer: EffectsContainer,
        observableComputed: ObservableComputed<T>,

        eventbus: EventBus<T>,
    )
    {
        super(observableComputed, eventbus);

        if (this.dependencies.size == 0)
        {
            this.valueAccessor.value = this.compute();
        }
    }

    protected override handleUnsubscribe(): void
    {
        if (this.eventbus.subscriptionsCount == 0)
        {
            this.observableComputed.setState(ObservableComputedStateType.sleeping);
        }
    }

    protected override handleDestroy(): void
    {
        super.handleDestroy();
        this.clearDependencies();
        this.effectsContainer.destroy();
    }

    protected compute(): T
    {
        const prevContext = this.contextAccessor;
        const newContext = new ObservableTrackingContextBase();

        this.contextAccessor.value = newContext;

        this.clearDependencies();

        try
        {
            const newValue = this.factory();

            for (const observable of newContext.observables)
            {
                this.addDependency(observable);
            }

            return newValue;
        } finally
        {
            this.contextAccessor = prevContext;
        }
    }

    private addDependency(observable: Observable<any>): void
    {
        if (this.dependencies.has(observable))
        {
            return;
        }

        this.effectsContainer.withContainer(() =>
        {
            observable.subscribe(() =>
            {
                this.stateReader.value.handleChange();
            });

            this.dependencies.add(observable);
        });
    }

    private clearDependencies(): void
    {
        this.effectsContainer.clear();
        this.dependencies.clear();
    }
}

class ObservableComputedStateSleeping<T> extends ObservableComputedStateBase<T>
{
    constructor(
        protected factory: Func<T>,
        observableComputed: ObservableComputed<T>,
        eventbus: EventBus<T>,
    )
    {
        super(observableComputed, eventbus);
    }

    override get value(): T
    {
        return this.factory();
    }

    protected override handleSubscribe(): void
    {
        this.observableComputed.setState(ObservableComputedStateType.active);
    }
}

class ObservableComputedStateActive<T> extends ObservableComputedStateWithTracking<T>
{
    override handleChange(): void
    {
        super.handleChange();

        this.observableComputed.setState(ObservableComputedStateType.computing);

        queueMicrotask(() =>
        {
            this.stateReader.value.recompute();
        });
    }
}

class ObservableComputedStateComputing<T> extends ObservableComputedStateWithTracking<T>
{
    override get value(): T
    {
        this.recompute();

        return super.value;
    }

    override recompute(): void
    {
        super.recompute();

        const newValue = this.compute();

        if (newValue !== this.valueAccessor.value)
        {
            this.valueAccessor.value = newValue;
            this.eventbus.emit(newValue);
        }

        this.observableComputed.setState(ObservableComputedStateType.active);
    }
}

class ObservableComputedStateDestroyed<T> implements ObservableComputedState<T>
{
    get value(): T
    {
        throw this.createError();
    }

    recompute(): void
    {

    }

    handleChange(): void
    {

    }

    subscribe(): Action
    {
        throw this.createError();
    }

    destroy(): void
    {

    }

    private createError()
    {
        return new DestroyedException();
    }
}
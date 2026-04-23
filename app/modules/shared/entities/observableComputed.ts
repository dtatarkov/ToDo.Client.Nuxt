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

export class ObservableComputed<T> extends ObservableBase<T>
{
    private _state: ObservableComputedState<T>;
    private _states: Record<ObservableComputedStateType, Func<ObservableComputedState<T>>>;

    get value()
    {
        return this._state.value;
    }

    constructor(private _factory: () => T)
    {
        super();

        const observableComputed = this;

        const valueAccessor = {
            _value: <T | undefined>undefined,
            _initialized: false,

            get value()
            {
                if (!this._initialized)
                {
                    this._initialized = true;
                    this._value = observableComputed._factory();
                }

                return <T>this._value;
            },

            set value(value)
            {
                if (!this._initialized)
                {
                    this._initialized = true;
                }

                this._value = value;
            }
        };

        const stateReader = {
            get value()
            {
                return observableComputed._state;
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

        const dependencies = new Map<Observable<any>, Action>();

        this._states = {
            [ObservableComputedStateType.sleeping]: () => new ObservableComputedStateSleeping(this._factory, this, this.eventbus),
            [ObservableComputedStateType.active]: () => new ObservableComputedStateActive(this._factory, stateReader, valueAccessor, contextAccessor, dependencies, this, this.eventbus),
            [ObservableComputedStateType.computing]: () => new ObservableComputedStateComputing(this._factory, stateReader, valueAccessor, contextAccessor, dependencies, this, this.eventbus),
            [ObservableComputedStateType.destroyed]: () => new ObservableComputedStateDestroyed(),
        };

        this._state = this._states[ObservableComputedStateType.sleeping]();
    }

    override subscribe(handler: Action<[T]>): Action
    {
        return this._state.subscribe(handler);
    }

    override destroy(): void
    {
        this._state.destroy();

    }

    setState(stateType: ObservableComputedStateType)
    {
        this._state = this._states[stateType]();
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
        protected dependencies: Map<Observable<any>, Action>,
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

        const unsubscribe = observable.subscribe(() =>
        {
            this.stateReader.value.handleChange();
        });

        this.dependencies.set(observable, unsubscribe);
    }

    private clearDependencies(): void
    {
        for (const unsubscribe of this.dependencies.values())
        {
            unsubscribe();
        }

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
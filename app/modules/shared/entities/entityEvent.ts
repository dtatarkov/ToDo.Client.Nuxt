import type { Action } from '../types/action';
import { DisposeToken } from './disposeToken';
import type { Subscribable } from '../interfaces/subscribable';

export type EntityEventConfiguration = {
    deferred?: boolean;
    skipEmitOnSameValue?: boolean;
};

export class EntityEvent<T = void> implements Subscribable<T>, Disposable
{
    private eventDisposeToken = new DisposeToken();
    private handlers = new Set<Action<[T]>>();
    private isDeferred = false;
    private emitter: EntityEventEmitter<T>;

    constructor(
        configuration?: EntityEventConfiguration
    )
    {
        const isDeferred = configuration?.deferred ?? false;
        const skipEmitOnSameValue = (configuration?.skipEmitOnSameValue ?? this.isDeferred);

        const lastValue = new EntityEventLastValue<T>();

        const emitPolicy: EntityEventEmitPolicy<T> = skipEmitOnSameValue ?
            new EntityEventEmitPolicySkipSame(lastValue) :
            new EntityEventEmitPolicyAlways();

        this.emitter = isDeferred ?
            new EntityEventEmitterDeferred(this.handlers, emitPolicy, lastValue, this.eventDisposeToken) :
            new EntityEventEmitterImmediate(this.handlers, emitPolicy, lastValue, this.eventDisposeToken);
    }

    on(handler: Action<[T]>, callbackDisposeToken?: DisposeToken): void
    {
        this.eventDisposeToken.assertNotDisposed();

        if (callbackDisposeToken && callbackDisposeToken.isDisposed)
        {
            return;
        }

        this.handlers.add(handler);

        if (callbackDisposeToken)
        {
            callbackDisposeToken.onDispose(() =>
            {
                this.handlers.delete(handler);
            });
        }
    }

    emit(value: T): void
    {
        this.eventDisposeToken.assertNotDisposed();
        this.emitter.emit(value);
    }

    [Symbol.dispose](): void
    {
        if (this.eventDisposeToken.isDisposed)
        {
            return;
        }

        this.handlers.clear();
        this.eventDisposeToken[Symbol.dispose]();
    }
}

class EntityEventLastValue<T>
{
    value: T | undefined;
}

abstract class EntityEventEmitPolicy<T>
{
    abstract allowEmit(value: T): boolean;
}

class EntityEventEmitPolicySkipSame<T> extends EntityEventEmitPolicy<T>
{
    constructor(private lastValue: EntityEventLastValue<T>)
    {
        super();
    }

    override allowEmit(value: T): boolean
    {
        return value === undefined ||
            value !== this.lastValue.value;
    }
}

class EntityEventEmitPolicyAlways<T> extends EntityEventEmitPolicy<T>
{
    override allowEmit(): boolean
    {
        return true;
    }
}

abstract class EntityEventEmitter<T>
{
    abstract emit(value: T): void;
}

abstract class EntityEventEmitterBase<T> extends EntityEventEmitter<T>
{
    constructor(
        private handlers: Set<Action<[T]>>,
        private emitPolicy: EntityEventEmitPolicy<T>,
        private lastValue: EntityEventLastValue<T>,
        private disposeToken: DisposeToken)
    {
        super();
    }

    protected emitInternal(value: T)
    {
        if (this.isEmitAllowed(value))
        {
            this.handlers.forEach(handler =>
            {
                handler(value);
            });

            this.onEmitted(value);
        }
    }

    protected onEmitted(value: T)
    {
        this.lastValue.value = value;
    }

    protected isEmitAllowed(value: T): boolean
    {
        if (this.disposeToken.isDisposed)
        {
            return false;
        }

        const result = this.emitPolicy.allowEmit(value);

        return result;
    }
}

class EntityEventEmitterDeferred<T> extends EntityEventEmitterBase<T>
{
    private scheduledEmit: { value: T; } | undefined;


    override emit(value: T): void
    {
        if (!this.scheduledEmit)
        {
            queueMicrotask(() =>
            {
                if (!this.scheduledEmit)
                {
                    return;
                }

                this.emitInternal(this.scheduledEmit.value);
            });
        }

        this.scheduledEmit = { value };
    }

    override onEmitted(value: T)
    {
        super.onEmitted(value);

        this.scheduledEmit = undefined;
    }
}

class EntityEventEmitterImmediate<T> extends EntityEventEmitterBase<T>
{
    override emit(value: T): void
    {
        this.emitInternal(value);
    }
}

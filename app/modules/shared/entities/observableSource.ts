import { DestroyedException } from '../exceptions/destroyedException';
import type { ObservableWritable } from '../interfaces/observableWritable';
import type { Action } from '../types/action';
import { ObservableBase } from './internal/observableBase';

export class ObservableSource<T> extends ObservableBase<T> implements ObservableWritable<T>
{
    #isDestroyed = false;

    constructor(protected valueInternal: T)
    {
        super();
    }

    override get value(): T
    {
        if (this.context)
        {
            this.context.register(this);
        }

        return this.valueInternal;
    }

    override set value(value: T)
    {
        if (this.valueInternal !== value)
        {
            this.valueInternal = value;
            this.eventbus.emit(value);
        }
    }

    subscribe(handler: Action<[T]>): Action
    {
        this.#assertNotDestroyed();

        return this.eventbus.subscribe(handler);
    }

    destroy(): void
    {
        this.eventbus.destroy();
        this.#isDestroyed = true;
    }

    #assertNotDestroyed(): void
    {
        if (this.#isDestroyed)
        {
            throw new DestroyedException();
        }
    }
}
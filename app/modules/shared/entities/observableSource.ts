import { DestroyedException } from '../exceptions/destroyedException';
import type { ObservableWritable } from '../interfaces/observableWritable';
import type { Action } from '../types/action';
import { DestroyTokenBase } from './destroyTokenBase';
import { ObservableBase } from './internal/observableBase';

export class ObservableSource<T> extends ObservableBase<T> implements ObservableWritable<T>
{
    private destroyToken = new DestroyTokenBase();

    constructor(protected valueInternal: T)
    {
        super();
    }

    override get value(): T
    {
        this.destroyToken.assertNotDestroyed();

        if (this.context)
        {
            this.context.register(this);
        }

        return this.valueInternal;
    }

    override set value(value: T)
    {
        this.destroyToken.assertNotDestroyed();

        if (this.valueInternal !== value)
        {
            this.valueInternal = value;
            this.eventbus.emit(value);
        }
    }

    subscribe(handler: Action<[T]>): Action
    {
        this.destroyToken.assertNotDestroyed();

        return this.eventbus.subscribe(handler);
    }

    destroy(): void
    {
        this.eventbus.destroy();
        this.destroyToken.destroy();
    }
}
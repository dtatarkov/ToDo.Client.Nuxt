import type { ObservableWritable } from '../interfaces/observableWritable';
import type { Action } from '../types/action';
import { isObject } from '../utils/isObject';
import { DestroyTokenImpl } from './destroyTokenImpl';
import { ObservableBase } from './internal/observableBase';

export class ObservableSource<T> extends ObservableBase<T> implements ObservableWritable<T>
{
    private destroyToken = new DestroyTokenImpl();

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

    mutate(mutationData: T extends Record<string, any> ? Partial<T> : never): void
    {
        if (isObject(this.valueInternal) && isObject(mutationData))
        {
            let hasChanges = false;

            for (const [key, value] of Object.entries(mutationData))
            {
                if (this.valueInternal[key] !== value)
                {
                    (this.valueInternal as any)[key] = value;
                    hasChanges = true;
                }
            }

            if (hasChanges)
            {
                this.eventbus.emit(this.valueInternal);
            }
        }
        else
        {
            throw new Error('Non object mutation is forbidden');
        }
    }

    override subscribe(handler: Action<[T]>): Action
    {
        this.destroyToken.assertNotDestroyed();

        return this.eventbus.subscribe(handler);
    }

    override destroy(): void
    {
        this.eventbus.destroy();
        this.destroyToken.destroy();
    }
}
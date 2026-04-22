import { ObservableBase } from './internal/observableBase';

export class ObservableSource<T> extends ObservableBase<T> implements ObservableWritable<T>
{
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
        this.valueInternal = value;
        this.eventbus.emit(value);
    }

    subscribe(handler: Action<[T]>): Action
    {
        return this.eventbus.subscribe(handler);
    }

    destroy(): void
    {
        this.eventbus.destroy();
    }
}
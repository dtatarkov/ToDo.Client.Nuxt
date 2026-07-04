import type { Action } from '../types/action';
import type { DisposeToken } from './disposeToken';
import { EntityEvent } from './entityEvent';
import type { ObservableReadonly } from './observableReadonly';
import type { ObservableWritable, ObservableWritableConfiguration } from './observableWritable';

export class ObservableWritableBase<T> implements ObservableWritable<T>, Disposable
{
    private event: EntityEvent<T>;
    private valueInternal: T;

    constructor(
        defaultValue: T,
        configuration?: ObservableWritableConfiguration
    )
    {
        this.valueInternal = defaultValue;
        this.event = new EntityEvent<T>(configuration);
    }

    get value(): T
    {
        return this.valueInternal;
    }

    set value(value: T)
    {
        if (this.valueInternal !== value)
        {
            this.valueInternal = value;
            this.event.emit(value);
        }
    }

    protected notifySubscribers(): void
    {
        this.event.emit(this.valueInternal);
    }

    on(handler: Action<[T]>, disposeToken?: DisposeToken): void
    {
        this.event.on(handler, disposeToken);
    }

    toReadonly(): ObservableReadonly<T>
    {
        return this;
    }

    [Symbol.dispose](): void
    {
        this.event[Symbol.dispose]();
    }
}
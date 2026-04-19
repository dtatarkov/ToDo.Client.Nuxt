import { EventBusBase } from "../entities/eventBusBase";
import type { ObservableWritable } from "../interfaces/observableWritable";

export class ObservableBase<T> implements ObservableWritable<T>
{
  protected eventbus = new EventBusBase<T>();

  constructor(private _value: T)
  {
  }

  get value(): T
  {
    return this._value;
  }

  set value(value: T)
  {
    this._value = value;
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
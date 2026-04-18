import type { SubscriptionOptions } from "../types/subscriptionOptions";
import type { Action } from "../types/action";
import { EventBusBase } from "../entities/eventBusBase";
import type { ObservableWritable } from "../interfaces/observableWritable";

export class ObservableBase<T> implements ObservableWritable<T>
{
  protected eventbus = new EventBusBase();

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
    this.eventbus.emit();
  }

  subscribe(handler: Action, options?: SubscriptionOptions): Action
  {
    const unsubscribe = this.eventbus.subscribe(handler);

    if (options?.immediate)
    {
      handler();
    }

    return unsubscribe;
  }

  destroy(): void
  {
    this.eventbus.destroy();
  }
}
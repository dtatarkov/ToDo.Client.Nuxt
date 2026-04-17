import type { SubscriptionOptions } from "../types/subscriptionOptions";
import { EventBusBase } from "../entities/eventBusBase";

export class ObservableBase<T> extends ObservableWritable<T>
{
  protected eventbus = new EventBusBase();

  constructor(private _value: T)
  {
    super();
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

  override subscribe(handler: Action, options?: SubscriptionOptions): Action
  {
    const unsubscribe = this.eventbus.subscribe(handler);

    if (options?.immediate)
    {
      handler();
    }

    return unsubscribe;
  }

  override destroy(): void
  {
    this.eventbus.destroy();
  }
}
import { EventBus } from "../interfaces/eventBus";
export class EventBusBase<T = void> extends EventBus<T>
{
  #subscriptions = new Set<Action<[T]>>();

  override subscribe(handler: Action<[T]>): Action
  {
    this.#subscriptions.add(handler);

    return () =>
    {
      this.#subscriptions.delete(handler);
    };
  }

  override emit(data: T): void
  {
    this.#subscriptions.forEach(handler => handler(data));
  }

  override destroy(): void
  {
    this.#subscriptions.clear();
  }
}
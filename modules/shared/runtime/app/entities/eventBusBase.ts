import { EventBus } from "../interfaces/eventBus";

export class EventBusBase extends EventBus
{
  #mainSubscriptions   = new Set<Action>();
  #awakeSubscriptions  = new Set<Func<Action>>();
  #asleepSubscriptions = new Set<Action>();

  override subscribe(handler: Action): Action
  {
    this.#mainSubscriptions.add(handler);

    if (this.#mainSubscriptions.size === 1)
    {
      this.#awakeSubscriptions.forEach(handler =>
      {
        const asleepHandler = handler();
        this.#asleepSubscriptions.add(asleepHandler);
      });
    }

    return () =>
    {
      this.#mainSubscriptions.delete(handler);

      if (this.#mainSubscriptions.size === 0)
      {
        this.#asleepSubscriptions.forEach(handler => handler());
        this.#asleepSubscriptions.clear();
      }
    }
  }

  override emit(): void
  {
    this.#mainSubscriptions.forEach(handler => handler());
  }

  override destroy(): void
  {
    this.#mainSubscriptions.clear();
  }

  override onAwake(handler: Func<Action>): void
  {
    this.#awakeSubscriptions.add(handler);
  }
}
import { EffectsContainerMissingException } from '../exceptions/effectsContainerMissingException';
import { EffectsContainer } from '../interfaces/effectsContainer';
import { EventBus } from "../interfaces/eventBus";
import type { Action } from '../types/action';
import { once } from '../utils/once';
export class EventBusBase<T = void> extends EventBus<T>
{
  #subscriptions = new Set<Action<[T]>>();

  get subscriptionsCount(): number
  {
    return this.#subscriptions.size;
  }

  override subscribe(handler: Action<[T]>): Action
  {
    const effectsContainer = EffectsContainer.current;

    if (!effectsContainer)
    {
      throw new EffectsContainerMissingException();
    }

    this.#subscriptions.add(handler);

    const unsubscribe = once(() =>
    {
      this.#subscriptions.delete(handler);
    });

    effectsContainer.register(unsubscribe);

    return unsubscribe;
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
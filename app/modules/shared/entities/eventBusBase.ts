import { EffectsContainerMissingException } from '../exceptions/effectsContainerMissingException';
import { EffectsContainer } from '../interfaces/effectsContainer';
import { EventBus } from "../interfaces/eventBus";
import type { Action } from '../types/action';
import { once } from '../utils/once';
export class EventBusBase<T = void> extends EventBus<T>
{
  private subscriptionsInternal = new Set<Action<[T]>>();

  get subscriptionsCount(): number
  {
    return this.subscriptionsInternal.size;
  }

  override subscribe(handler: Action<[T]>): Action
  {
    const effectsContainer = EffectsContainer.current;

    if (!effectsContainer)
    {
      throw new EffectsContainerMissingException();
    }

    this.subscriptionsInternal.add(handler);

    const unsubscribe = once(() =>
    {
      this.subscriptionsInternal.delete(handler);
    });

    effectsContainer.register(unsubscribe);

    return unsubscribe;
  }

  override emit(data: T): void
  {
    this.subscriptionsInternal.forEach(handler => handler(data));
  }

  override destroy(): void
  {
    this.subscriptionsInternal.clear();
  }
}
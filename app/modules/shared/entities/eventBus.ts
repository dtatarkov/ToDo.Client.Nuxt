import { EffectsContainerMissingException } from '../exceptions/effectsContainerMissingException';
import { EffectsContainer } from '../interfaces/effectsContainer';
import type { Action } from '../types/action';
import { once } from '../utils/once';

export class EventBus<T = void>
{
  private subscriptionsInternal = new Set<Action<[T]>>();

  get subscriptionsCount(): number
  {
    return this.subscriptionsInternal.size;
  }

  subscribe(handler: Action<[T]>): Action
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

  emit(data: T): void
  {
    this.subscriptionsInternal.forEach(handler => handler(data));
  }

  destroy(): void
  {
    this.subscriptionsInternal.clear();
  }
}
import { EffectsContainerImpl } from '../entities/effectsContainerImpl';
import type { Subscribable } from '../interfaces/subscribable';
import type { Action } from '../types/action';

export function useSubscribable<T>(subscribable: Subscribable<T>, handler: Action<[T]>)
{
    const effectsContainer = new EffectsContainerImpl();

    effectsContainer.withContainer(() =>
    {
        subscribable.subscribe(handler);
    });

    onUnmounted(() =>
    {
        effectsContainer.destroy();
    });
}
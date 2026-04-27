import { EffectsContainerBase } from '../entities/effectsContainerBase';
import type { Subscribable } from '../interfaces/subscribable';
import type { Action } from '../types/action';

export function useSubscribable<T>(subscribable: Subscribable<T>, handler: Action<[T]>)
{
    const effectsContainer = new EffectsContainerBase();

    effectsContainer.withContainer(() =>
    {
        subscribable.subscribe(handler);
    });

    onUnmounted(() =>
    {
        effectsContainer.destroy();
    });
}
import { EffectsContainerImpl } from '../entities/effectsContainerImpl';
import type { EffectsContainer } from '../interfaces/effectsContainer';
import type { Action } from '../types/action';

export function useEffectsContainer(handler?: Action): EffectsContainer
{
    const effectsContainer = new EffectsContainerImpl();

    onUnmounted(() =>
    {
        effectsContainer.destroy();
    });

    if (handler != undefined)
    {
        effectsContainer.withContainer(handler);
    }

    return effectsContainer;
}
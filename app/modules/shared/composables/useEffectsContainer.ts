import { EffectsContainerBase } from '../entities/effectsContainerBase';
import type { EffectsContainer } from '../interfaces/effectsContainer';

const effectsContainerKey = '$EffectsContainer';

export function useEffectsContainer(): EffectsContainer
{
    const instance = getCurrentInstance();

    if (instance == null)
    {
        throw new Error('Component instance is not available');
    }

    let effectsContainer = instance.data[effectsContainerKey] as EffectsContainer | undefined;

    if (effectsContainer == undefined)
    {
        effectsContainer = new EffectsContainerBase();
    }

    return effectsContainer;
}

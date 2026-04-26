import { EffectsContainer } from '../interfaces/effectsContainer';
import type { Action } from '../types/action';
import { DestroyTokenBase } from './destroyTokenBase';

export class EffectsContainerBase extends EffectsContainer
{
    private destroyCallbacks = new Set<Action>();
    private destroyToken = new DestroyTokenBase();

    override withContainer(action: Action): void
    {
        this.destroyToken.assertNotDestroyed();

        const previous = EffectsContainer.current;
        EffectsContainer.current = this;

        try
        {
            action();
        }
        finally
        {
            EffectsContainer.current = previous;
        }
    }

    override register(onDestroy: Action): void
    {
        this.destroyToken.assertNotDestroyed();
        this.destroyCallbacks.add(onDestroy);
    }

    override clear(): void
    {
        this.destroyToken.assertNotDestroyed();
        this.destroyCallbacks.forEach(callback => callback());
        this.destroyCallbacks.clear();
    }

    override destroy(): void
    {
        if (this.destroyToken.isDestroyed)
        {
            return;
        }

        this.clear();
        this.destroyToken.destroy();
    }
}
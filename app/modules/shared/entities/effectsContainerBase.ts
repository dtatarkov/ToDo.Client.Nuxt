import { EffectsContainer } from '../interfaces/effectsContainer';
import { DestroyedException } from '../exceptions/destroyedException';
import type { Action } from '../types/action';

export class EffectsContainerBase extends EffectsContainer
{
    private destroyCallbacks = new Set<Action>();
    private isDestroyed = false;

    override withContainer(action: Action): void
    {
        this.assertNotDestroyed();

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
        this.assertNotDestroyed();
        this.destroyCallbacks.add(onDestroy);
    }

    override destroy(): void
    {
        if (this.isDestroyed)
        {
            return;
        }

        this.isDestroyed = true;
        this.destroyCallbacks.forEach(callback => callback());
        this.destroyCallbacks.clear();
    }

    private assertNotDestroyed(): void
    {
        if (this.isDestroyed)
        {
            throw new DestroyedException();
        }
    }
}
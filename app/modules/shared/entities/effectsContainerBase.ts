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

    override clear(): void
    {
        this.assertNotDestroyed();
        this.destroyCallbacks.forEach(callback => callback());
        this.destroyCallbacks.clear();
    }

    override destroy(): void
    {
        if (this.isDestroyed)
        {
            return;
        }

        this.clear();
        this.isDestroyed = true;
    }

    private assertNotDestroyed(): void
    {
        if (this.isDestroyed)
        {
            throw new DestroyedException();
        }
    }
}
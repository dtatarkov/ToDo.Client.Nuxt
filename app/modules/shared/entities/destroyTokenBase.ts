import { DestroyToken } from '../interfaces/destroyToken';
import { DestroyedException } from '../exceptions/destroyedException';

/**
 * Base implementation of DestroyToken.
 * Provides basic destruction state tracking and assertion.
 */
export class DestroyTokenBase extends DestroyToken
{
    private isDestroyedInternal = false;

    /**
     * Gets whether the token has been destroyed.
     */
    get isDestroyed(): boolean
    {
        return this.isDestroyedInternal;
    }

    /**
     * Asserts that the token is not destroyed.
     * @throws {DestroyedException} If the token is destroyed
     */
    assertNotDestroyed(): void
    {
        if (this.isDestroyedInternal)
        {
            throw new DestroyedException();
        }
    }

    /**
     * Destroys the token, marking it as destroyed.
     * Subsequent calls to destroy() have no effect.
     */
    override destroy(): void
    {
        if (this.isDestroyedInternal)
        {
            return;
        }

        this.isDestroyedInternal = true;
    }
}
import { Destroyable } from './destroyable';

/**
 * Interface for a token that tracks destruction state.
 * Provides methods to check if destroyed and assert not destroyed.
 */
export abstract class DestroyToken extends Destroyable
{
    /**
     * Gets whether the token has been destroyed.
     */
    abstract get isDestroyed(): boolean;

    /**
     * Asserts that the token is not destroyed.
     * @throws {DestroyedException} If the token is destroyed
     */
    abstract assertNotDestroyed(): void;
}
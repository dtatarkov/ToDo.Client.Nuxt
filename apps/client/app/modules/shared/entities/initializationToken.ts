import { InitializedException } from '../exceptions/initializedException';
import { NotInitializedException } from '../exceptions/notInitializedException';

export class InitializationToken
{
    private isInitializedInternal = false;

    /**
     * Gets whether the token has been initialized.
     */
    get isInitialized(): boolean
    {
        return this.isInitializedInternal;
    }

    /**
     * Asserts that the token is initialized.
     * @throws {NotInitializedException} If the token is not initialized
     */
    assertInitialized(): void
    {
        if (!this.isInitializedInternal)
        {
            throw new NotInitializedException();
        }
    }

    /**
     * Asserts that the token is not initialized.
     * @throws {InitializedException} If the token is already initialized
     */
    assertNotInitialized(): void
    {
        if (this.isInitializedInternal)
        {
            throw new InitializedException();
        }
    }

    /**
     * Initializes the token, marking it as initialized.
     * Subsequent calls to init() have no effect.
     */
    initialize(): void
    {
        if (this.isInitializedInternal)
        {
            return;
        }

        this.isInitializedInternal = true;
    }
}
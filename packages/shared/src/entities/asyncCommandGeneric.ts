import type { Func } from '../types/func';
import { AsyncCommandBase } from './asyncCommandBase';

/**
 * A concrete async command wrapped around an execution function.
 *
 * Allows creating an async command by passing an async function
 * that will be executed when `executeAsync()` is called.
 *
 * @example
 * ```ts
 * const command = new AsyncCommandGeneric(async () => {
 *     const data = await fetchData();
 *     return data !== null;
 * });
 *
 * command.onExecuting(() => console.log('Executing...'));
 * command.onExecuted(() => console.log('Done'));
 * command.onIdle(() => console.log('Idle'));
 *
 * const success = await command.executeAsync();
 * ```
 */
export class AsyncCommandGeneric extends AsyncCommandBase
{
    /**
     * Creates an async command from the provided function.
     * @param executeInternal — async function implementing the command logic.
     *                          Should return `true` on success, `false` on cancellation,
     *                          or `undefined` for a neutral result.
     */
    constructor(
        private executeInternal: Func<Promise<boolean | undefined | void>>
    )
    {
        super();
    }

    /**
     * Execution logic — delegates to the function passed to the constructor.
     * @returns the result of `executeInternal()`
     */
    protected override async handleExecution(): Promise<boolean | undefined>
    {
        const result = (await this.executeInternal()) as boolean | undefined;

        return result;
    }
}

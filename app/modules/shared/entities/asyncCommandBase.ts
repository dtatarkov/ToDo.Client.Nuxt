import type { Func } from '../types/func';
import { AsyncCommand } from './asyncCommand';
import type { AsyncCommandCallbacks } from './asyncCommand';
import { CommandState } from '../enums/commandState';
import { callbacksWrapper } from '../utils/callbacksWrapper';

export class AsyncCommandBase<T> extends AsyncCommand<T>
{
    private callbacks = callbacksWrapper<AsyncCommandCallbacks<T>>();

    constructor(
        private executeInternal: Func<Promise<T>>
    )
    {
        super();
    }

    override on(callbacks: Partial<AsyncCommandCallbacks<T>>): void
    {
        this.callbacks(callbacks);
    }

    async executeAsync(): Promise<T>
    {
        this.callbacks.stateChange?.(CommandState.busy);

        try
        {
            const result = await this.executeInternal();

            this.callbacks.result?.(result);

            return result;
        }
        catch (error)
        {
            this.callbacks.error?.(error);
            throw error;
        }
        finally
        {
            this.callbacks.stateChange?.(CommandState.readyToStart);
        }
    }
}
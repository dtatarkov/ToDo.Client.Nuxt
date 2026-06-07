import type { Func } from '../types/func';
import { AsyncCommand } from './asyncCommand';
import type { AsyncCommandCallbacks } from './asyncCommand';
import { CommandState } from '../enums/commandState';
import { callbacksWrapper } from './callbacksWrapper';

export class AsyncCommandBase extends AsyncCommand
{
    private state = CommandState.readyToStart;
    private callbacks = callbacksWrapper<AsyncCommandCallbacks>();

    constructor(
        private executeInternal: Func<Promise<boolean | undefined>>
    )
    {
        super();
    }

    override on(callbacks: Partial<AsyncCommandCallbacks>): void
    {
        this.callbacks(callbacks);
    }

    async executeAsync(): Promise<boolean>
    {
        if (this.state !== CommandState.readyToStart)
        {
            return false;
        }

        this.setState(CommandState.busy);

        try
        {
            const result = await this.executeInternal() ?? true;

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
            this.setState(CommandState.readyToStart);
        }
    }

    private setState(state: CommandState): void
    {
        this.state = state;
        this.callbacks.stateChange?.(state);
    }
}
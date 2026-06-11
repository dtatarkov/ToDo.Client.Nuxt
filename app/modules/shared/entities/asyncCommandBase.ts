import type { Func } from '../types/func';
import type { Action } from '../types/action';
import type { DisposeToken } from './disposeToken';
import { AsyncCommand } from './asyncCommand';
import { Event } from './event';
import { CommandState } from '../enums/commandState';

export class AsyncCommandBase extends AsyncCommand
{
    private state = CommandState.idle;
    private onIdleEvent = new Event<void>();
    private onExecutingEvent = new Event<void>();
    private onExecutedEvent = new Event<void>();

    constructor(
        private executeInternal: Func<Promise<boolean | undefined>>
    )
    {
        super();
    }

    override onIdle(handler: Action, token: DisposeToken): void
    {
        this.onIdleEvent.on(handler, token);
    }

    override onExecuting(handler: Action, token: DisposeToken): void
    {
        this.onExecutingEvent.on(handler, token);
    }

    override onExecuted(handler: Action, token: DisposeToken): void
    {
        this.onExecutedEvent.on(handler, token);
    }

    async executeAsync(): Promise<boolean>
    {
        if (this.state !== CommandState.idle)
        {
            return false;
        }

        this.setState(CommandState.executing);
        this.onExecutingEvent.emit();

        try
        {
            const result = await this.executeInternal() ?? true;

            if (result)
            {
                this.onExecutedEvent.emit();
            }

            return result;
        }
        finally
        {
            this.setState(CommandState.idle);
            this.onIdleEvent.emit();
        }
    }

    [Symbol.dispose](): void
    {
        this.onIdleEvent[Symbol.dispose]();
        this.onExecutingEvent[Symbol.dispose]();
        this.onExecutedEvent[Symbol.dispose]();
    }

    private setState(state: CommandState): void
    {
        this.state = state;
    }
}
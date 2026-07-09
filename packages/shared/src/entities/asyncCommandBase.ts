import type { Func } from '../types/func';
import type { Action } from '../types/action';
import { DisposeToken } from './disposeToken';
import { AsyncCommand } from './asyncCommand';
import { EntityEvent } from './entityEvent';
import { CommandState } from '../enums/commandState';

export class AsyncCommandBase extends AsyncCommand
{
    private state = CommandState.idle;
    private onIdleEvent = new EntityEvent<void>();
    private onExecutingEvent = new EntityEvent<void>();
    private onExecutedEvent = new EntityEvent<void>();
    private disposeToken = new DisposeToken();

    constructor(

        private executeInternal: Func<Promise<boolean | undefined> | Promise<void>>
    )
    {
        super();
    }

    override onIdle(handler: Action, token?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.onIdleEvent.on(handler, token);
    }

    override onExecuting(handler: Action, token?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.onExecutingEvent.on(handler, token);
    }

    override onExecuted(handler: Action, token?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.onExecutedEvent.on(handler, token);
    }

    async executeAsync(): Promise<boolean>
    {
        this.disposeToken.assertNotDisposed();

        if (this.state !== CommandState.idle)
        {
            return false;
        }

        this.setState(CommandState.executing);
        this.onExecutingEvent.emit();

        try
        {
            const result = await (this.executeInternal() as Promise<boolean | undefined>) ?? true;

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
        if (this.disposeToken.isDisposed)
        {
            return;
        }

        this.onIdleEvent[Symbol.dispose]();
        this.onExecutingEvent[Symbol.dispose]();
        this.onExecutedEvent[Symbol.dispose]();
        this.disposeToken[Symbol.dispose]();
    }

    private setState(state: CommandState): void
    {
        this.state = state;
    }
}
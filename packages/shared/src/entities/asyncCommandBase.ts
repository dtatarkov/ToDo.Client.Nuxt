import type { Action } from '../types/action';
import { AsyncCommand } from './asyncCommand';
import { DisposeToken } from './disposeToken';
import { EntityEvent } from './entityEvent';
import { CommandState } from '../enums/commandState';

/**
 * Abstract base class for async commands.
 *
 * Implements the common command lifecycle:
 * - State management (idle → executing → idle)
 * - Events: onIdle, onExecuting, onExecuted
 * - Guard against re-entry during execution
 * - Automatic resource cleanup via Disposable
 *
 * Subclasses must implement `handleExecution()` to define
 * the specific execution logic.
 */
export abstract class AsyncCommandBase extends AsyncCommand implements Disposable
{
    private disposeToken = new DisposeToken();

    /** Event fired when the command transitions to idle state. */
    protected onIdleEvent = new EntityEvent<void>();
    /** Event fired when the command starts executing. */
    protected onExecutingEvent = new EntityEvent<void>();
    /** Event fired when the command completes successfully. */
    protected onExecutedEvent = new EntityEvent<void>();

    private state = CommandState.idle;

    constructor()
    {
        super();

        this.disposeToken.registerDisposable(this.onIdleEvent);
        this.disposeToken.registerDisposable(this.onExecutingEvent);
        this.disposeToken.registerDisposable(this.onExecutedEvent);
    }

    /**
     * Subscribes to the idle event.
     * @param handler — event handler
     * @param token — optional dispose token for auto-unsubscribe
     */
    override onIdle(handler: Action, token?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.onIdleEvent.on(handler, token);
    }

    /**
     * Subscribes to the executing event.
     * @param handler — event handler
     * @param token — optional dispose token for auto-unsubscribe
     */
    override onExecuting(handler: Action, token?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.onExecutingEvent.on(handler, token);
    }

    /**
     * Subscribes to the executed event.
     * @param handler — event handler
     * @param token — optional dispose token for auto-unsubscribe
     */
    override onExecuted(handler: Action, token?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.onExecutedEvent.on(handler, token);
    }

    /**
     * Executes the command.
     *
     * Returns `false` if the command is already running.
     * Always restores idle state after completion (success or error).
     *
     * @returns `true` if execution completed successfully, `false` if already running or execution returned false
     */
    override async executeAsync(): Promise<boolean>
    {
        this.disposeToken.assertNotDisposed();

        if (this.state !== CommandState.idle)
        {
            return false;
        }

        this.setState(CommandState.executing);

        try
        {
            const result = (await this.handleExecution()) ?? true;

            if (result)
            {
                this.onExecutedEvent.emit();
            }

            return result;
        }
        finally
        {
            this.setState(CommandState.idle);
        }
    }

    /**
     * Abstract method for execution logic in subclasses.
     * Called inside `executeAsync()` after transitioning to executing state.
     *
     * @returns `true` on success, `false` on cancellation, `undefined` for neutral result
     */
    protected abstract handleExecution(): Promise<boolean | undefined>;

    /**
     * Sets the command state and emits the corresponding event.
     * @param state — new command state
     */
    protected setState(state: CommandState): void
    {
        this.state = state;

        switch (state)
        {
            case CommandState.executing:
                this.onExecutingEvent.emit();
                break;

            case CommandState.idle:
                this.onIdleEvent.emit();
                break;
        }
    }

    /**
     * Disposes all resources associated with the command.
     * Unsubscribes all event handlers and disposes the inner token.
     */
    [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
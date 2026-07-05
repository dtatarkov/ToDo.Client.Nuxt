import type { Action } from '../types/action';
import type { DisposeToken } from './disposeToken';

export abstract class AsyncCommand
{
    abstract executeAsync(): Promise<boolean>;

    abstract onIdle(handler: Action, token?: DisposeToken): void;
    abstract onExecuting(handler: Action, token?: DisposeToken): void;
    abstract onExecuted(handler: Action, token?: DisposeToken): void;
}
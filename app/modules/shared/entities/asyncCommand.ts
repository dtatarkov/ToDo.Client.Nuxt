import type { Action } from '../types/action';
import { CallbacksOwner } from '../interfaces/callbacksOwner';
import type { CommandState } from '../enums/commandState';

export type AsyncCommandCallbacks = {
    result: Action<[boolean]>;
    stateChange: Action<[CommandState]>;
    error: Action<[unknown]>;
};

export abstract class AsyncCommand extends CallbacksOwner<AsyncCommandCallbacks>
{
    abstract executeAsync(): Promise<boolean>;
}
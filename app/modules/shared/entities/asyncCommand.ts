import type { Action } from '../types/action';
import { CallbacksOwners } from '../interfaces/callbacksOwners';
import type { CommandState } from '../enums/commandState';

export type AsyncCommandCallbacks = {
    result: Action<[boolean]>;
    stateChange: Action<[CommandState]>;
    error: Action<[unknown]>;
};

export abstract class AsyncCommand extends CallbacksOwners<AsyncCommandCallbacks>
{
    abstract executeAsync(): Promise<boolean>;
}
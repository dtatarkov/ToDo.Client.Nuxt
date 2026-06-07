import type { Action } from '../types/action';
import { CallbacksOwners } from '../interfaces/callbacksOwners';
import type { CommandState } from '../enums/commandState';

export type AsyncCommandCallbacks<T> = {
    result: Action<[T]>;
    stateChange: Action<[CommandState]>;
    error: Action<[unknown]>;
};

export abstract class AsyncCommand<T> extends CallbacksOwners<AsyncCommandCallbacks<T>>
{
    abstract executeAsync(): Promise<T>;
}
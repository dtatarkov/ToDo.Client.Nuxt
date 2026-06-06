import type { Action } from './action';

export abstract class AsyncCommand<T>
{
    abstract executeAsync(): Promise<T>;
    abstract setExecutionHandler(handler: Action<[Promise<T>]>): void;
}
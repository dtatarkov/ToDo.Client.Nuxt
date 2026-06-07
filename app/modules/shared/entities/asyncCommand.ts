import type { Action } from '../types/action';

export abstract class AsyncCommand<T>
{
    abstract executeAsync(): Promise<T>;
    abstract setExecutionHandler(handler: Action<[Promise<T>]>): void;
}
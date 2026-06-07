import type { Action } from '../types/action';
import type { Func } from '../types/func';
import { AsyncCommand } from './asyncCommand';

export class AsyncCommandBase<T> extends AsyncCommand<T>
{
    private executionHandler: Action<[Promise<T>]> | undefined;

    constructor(
        private executeInternal: Func<Promise<T>>
    )
    {
        super();
    }

    setExecutionHandler(handler: Action<[Promise<T>]>): void
    {
        this.executionHandler = handler;
    }

    async executeAsync(): Promise<T>
    {
        const resultPromise = this.executeInternal();

        this.executionHandler?.(resultPromise);

        return resultPromise;
    }
}
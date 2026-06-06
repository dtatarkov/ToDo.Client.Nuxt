import type { Action } from './action';
import type { Func } from './func';
import { AsyncCommand } from './asyncCommand';

export class AsyncCommandImpl<T> extends AsyncCommand<T>
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
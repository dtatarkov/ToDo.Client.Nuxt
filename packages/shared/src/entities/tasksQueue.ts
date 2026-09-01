import { DisposeToken } from './disposeToken';
import type { Func } from '../types/func';

export class TasksQueue implements Disposable
{
    private disposeToken = new DisposeToken();
    private lastTask: Promise<unknown> = Promise.resolve();

    queueTask<T>(task: Func<Promise<T>>): Promise<T>
    {
        this.disposeToken.assertNotDisposed();

        const chainedTask = this.lastTask
            .catch(() => { /* ignore previous errors */ })
            .then(() =>
            {
                this.disposeToken.assertNotDisposed();

                return task();
            });

        this.lastTask = chainedTask;

        return chainedTask;
    }

    async awaitAll(): Promise<void>
    {
        await this.lastTask;
    }

    [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}

import { HandlerAlreadySetException } from '../exceptions/handlerAlreadySetException';
import type { Action } from '../types/action';
import { DisposeToken } from './disposeToken';

export class HandlerWrapper<T extends any[] = []> implements Disposable
{
    private disposeToken = new DisposeToken();
    private handler: Action<T> | undefined;

    setHandler(handler: Action<T>): void
    {
        this.disposeToken.assertNotDisposed();

        if (this.handler)
        {
            throw new HandlerAlreadySetException();
        }

        this.handler = handler;
    }

    handle(...args: T): void
    {
        this.handler?.(...args);
    }

    [Symbol.dispose]()
    {
        this.disposeToken[Symbol.dispose]();
        this.handler = undefined;
    }
}
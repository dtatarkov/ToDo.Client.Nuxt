import { HandlerAlreadySetException } from '../exceptions/handlerAlreadySetException';
import type { Action } from '../types/action';

export class HandlerWrapper<T extends any[] = []>
{
    private handler: Action<T> | undefined;

    setHandler(handler: Action<T>): void
    {
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
}
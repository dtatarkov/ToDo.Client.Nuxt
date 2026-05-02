import { HandlerAlreadySetException } from '../exceptions/handlerAlreadySetException';
import type { Action } from '../types/action';
import { DestroyTokenImpl } from './destroyTokenImpl';

export class HandlerWrapper<T extends any[] = []>
{
    private destroyToken = new DestroyTokenImpl();
    private handler: Action<T> | undefined;

    setHandler(handler: Action<T>): void
    {
        this.destroyToken.assertNotDestroyed();

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

    destroy()
    {
        this.destroyToken.destroy();
        this.handler = undefined;
    }
}
import type { Action } from '../types/action';
import { DisposeToken } from './disposeToken';

export class EntityEvent<T = void> implements Disposable
{
    private eventDisposeToken = new DisposeToken();
    private handlers = new Set<Action<[T]>>();

    on(handler: Action<[T]>, callbackDisposeToken?: DisposeToken): void
    {
        this.eventDisposeToken.assertNotDisposed();

        if (callbackDisposeToken && callbackDisposeToken.isDisposed)
        {
            return;
        }

        this.handlers.add(handler);

        if (callbackDisposeToken)
        {
            callbackDisposeToken.onDispose(() =>
            {
                this.handlers.delete(handler);
            });
        }
    }

    emit(value: T): void
    {
        this.eventDisposeToken.assertNotDisposed();

        this.handlers.forEach(handler =>
        {
            handler(value);
        });
    }

    [Symbol.dispose](): void
    {
        if (this.eventDisposeToken.isDisposed)
        {
            return;
        }

        this.handlers.clear();
        this.eventDisposeToken[Symbol.dispose]();
    }
}

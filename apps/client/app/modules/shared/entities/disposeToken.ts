import type { Action } from '../types/action';
import { DisposedException } from '../exceptions/disposedException';

export class DisposeToken implements Disposable
{
    private isDisposedInternal = false;
    private disposeHandlers = new Set<Action>();

    get isDisposed(): boolean
    {
        return this.isDisposedInternal;
    }

    createChildToken(): DisposeToken
    {
        const childToken = new DisposeToken();

        this.onDispose(() =>
        {
            childToken[Symbol.dispose]();
        });

        return childToken;
    }

    reset(): void
    {
        this[Symbol.dispose]();
        this.isDisposedInternal = false;
    }

    onDispose(handler: Action): void
    {
        this.assertNotDisposed();
        this.disposeHandlers.add(handler);
    }

    assertNotDisposed(): void
    {
        if (this.isDisposedInternal)
        {
            throw new DisposedException();
        }
    }

    [Symbol.dispose](): void
    {
        if (this.isDisposedInternal)
        {
            return;
        }

        this.disposeHandlers.forEach(handler => handler());
        this.disposeHandlers.clear();
        this.isDisposedInternal = true;
    }
}
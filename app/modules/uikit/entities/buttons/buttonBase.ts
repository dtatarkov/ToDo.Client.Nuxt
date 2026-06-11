import { Button, type ButtonCallbacks } from './button';
import { callbacksWrapper } from '@/modules/shared/entities/callbacksWrapper';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';

export abstract class ButtonBase extends Button implements Disposable
{
    protected callbacks = callbacksWrapper<ButtonCallbacks>();
    protected disposeToken = new DisposeToken();

    private command: AsyncCommand | undefined;

    override setCommand(command: AsyncCommand): void
    {
        this.disposeToken.assertNotDisposed();

        if (this.command !== undefined)
        {
            throw new InitializationOnlyException('command');
        }

        this.command = command;
    }

    override on(callbacks: Partial<ButtonCallbacks>): void
    {
        this.disposeToken.assertNotDisposed();
        this.callbacks(callbacks);
    }

    [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }

    protected handleClick(): void
    {
        this.disposeToken.assertNotDisposed();
        this.command?.executeAsync();
        this.callbacks.click?.();
    }
}
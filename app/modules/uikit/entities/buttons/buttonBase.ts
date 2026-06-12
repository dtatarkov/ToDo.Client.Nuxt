import { Button } from './button';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';

export abstract class ButtonBase extends Button implements Disposable
{
    protected onClickEvent = new EntityEvent();
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

    override onClick(handler: Action): void
    {
        this.disposeToken.assertNotDisposed();
        this.onClickEvent.on(handler, this.disposeToken);
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }

    protected handleClick(): void
    {
        this.disposeToken.assertNotDisposed();
        this.command?.executeAsync();
        this.onClickEvent.emit();
    }
}
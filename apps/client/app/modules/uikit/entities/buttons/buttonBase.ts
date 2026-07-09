import { Button } from './button';
import { DisposeToken, InitializationOnlyException, EntityEvent } from '@client/shared';
import type { AsyncCommand, Action } from '@client/shared';




export abstract class ButtonBase extends Button implements Disposable
{
    protected onClickEvent = new EntityEvent();
    protected disposeToken = new DisposeToken();

    private command: AsyncCommand | undefined;

    override click(): void
    {
        this.disposeToken.assertNotDisposed();
        this.command?.executeAsync();
        this.onClickEvent.emit();
    }

    override getCommand(): AsyncCommand | undefined
    {
        return this.command;
    }

    override setCommand(command: AsyncCommand): void
    {
        this.disposeToken.assertNotDisposed();

        if (this.command !== undefined)
        {
            throw new InitializationOnlyException('command');
        }

        this.command = command;
    }

    override onClick(handler: Action, disposeToken?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.onClickEvent.on(handler, disposeToken);
    }

    override[Symbol.dispose](): void
    {
        if (this.disposeToken.isDisposed)
        {
            return;
        }

        this.onClickEvent[Symbol.dispose]();
        this.disposeToken[Symbol.dispose]();
    }
}
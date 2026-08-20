import { ViewmodelBase, ObservableViewmodelStateBase } from '@client/ui-core';
import { ButtonViewmodel } from './buttonViewmodel';
import type { ButtonData } from '../types/buttonData';
import { EntityEvent, DisposeToken, InitializationOnlyException } from '@client/shared';
import type { AsyncCommand, Action } from '@client/shared';

export abstract class ButtonBaseViewmodelImpl<TData extends ButtonData> extends ViewmodelBase<TData> implements ButtonViewmodel<TData>
{
    protected onClickEvent = new EntityEvent();
    protected command: AsyncCommand | undefined;

    state = new ObservableViewmodelStateBase<TData>({
        ...this.getBaseInitialData(),
        ...this.getInitialData(),
    } as TData);

    get isDisabled(): boolean
    {
        return this.state.value.isDisabled;
    }

    getCommand(): AsyncCommand | undefined
    {
        return this.command;
    }

    setCommand(command: AsyncCommand): void
    {
        this.disposeToken.assertNotDisposed();

        if (this.command !== undefined)
        {
            throw new InitializationOnlyException('command');
        }

        this.command = command;
    }

    disable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.state.update({ isDisabled: true } as Partial<TData>);
    }

    enable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.state.update({ isDisabled: false } as Partial<TData>);
    }

    click(): void
    {
        this.disposeToken.assertNotDisposed();
        this.command?.executeAsync();
        this.onClickEvent.emit();
    }

    onClick(handler: Action, disposeToken?: DisposeToken): void
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
        super[Symbol.dispose]();
    }

    private getBaseInitialData(): ButtonData
    {
        return { isDisabled: false };
    }

    protected abstract getInitialData(): Omit<TData, keyof ButtonData>;
}

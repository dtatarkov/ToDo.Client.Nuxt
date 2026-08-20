import { ButtonBaseViewmodelImpl } from './buttonBaseViewmodelImpl';
import { ButtonGeneralViewmodel } from './buttonGeneralViewmodel';
import type { ButtonGeneralData } from '../types/buttonGeneralData';
import type { ButtonData } from '../types/buttonData';
import type { Color } from '@client/ui-core';
import type { AsyncCommand } from '@client/shared';

export class ButtonGeneralViewmodelImpl extends ButtonBaseViewmodelImpl<ButtonGeneralData> implements ButtonGeneralViewmodel
{
    protected override getInitialData(): Omit<ButtonGeneralData, keyof ButtonData>
    {
        return {
            title: '',
            color: 'neutral',
            isLoading: false,
        };
    }

    get title(): string
    {
        return this.state.value.title;
    }

    set title(value: string)
    {
        this.state.update({ title: value });
    }

    get color(): Color
    {
        return this.state.value.color;
    }

    set color(value: Color)
    {
        this.state.update({ color: value });
    }

    get isLoading(): boolean
    {
        return this.state.value.isLoading;
    }

    override setCommand(command: AsyncCommand): void
    {
        super.setCommand(command);

        command.onIdle(() =>
        {
            this.hideLoader();
        }, this.disposeToken);

        command.onExecuting(() =>
        {
            this.showLoader();
        }, this.disposeToken);
    }

    showLoader(): void
    {
        this.disposeToken.assertNotDisposed();
        this.state.update({ isLoading: true });
    }

    hideLoader(): void
    {
        this.disposeToken.assertNotDisposed();
        this.state.update({ isLoading: false });
    }
}
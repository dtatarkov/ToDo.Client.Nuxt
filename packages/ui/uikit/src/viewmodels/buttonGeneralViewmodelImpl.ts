import { ButtonBaseViewmodelImpl } from './buttonBaseViewmodelImpl';
import { ButtonGeneralViewmodel } from './buttonGeneralViewmodel';
import type { ButtonGeneralData } from '../types/buttonGeneralData';
import type { ButtonData } from '../types/buttonData';
import type { Color } from '@client/ui-core';
import type { MessageKey } from '@client/infrastructure-messages';
import type { AsyncCommand } from '@client/shared';

export class ButtonGeneralViewmodelImpl extends ButtonBaseViewmodelImpl<ButtonGeneralData> implements ButtonGeneralViewmodel
{
    protected override getInitialData(): Omit<ButtonGeneralData, keyof ButtonData>
    {
        return {
            title: undefined,
            color: 'neutral',
            isLoading: false,
        };
    }

    setTitle(title: MessageKey | undefined): void
    {
        this.state.update({ title });
    }

    setColor(color: Color): void
    {
        this.state.update({ color });
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
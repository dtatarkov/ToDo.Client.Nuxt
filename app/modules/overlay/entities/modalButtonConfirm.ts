import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import { ButtonGeneralBase } from '@/modules/uikit/entities/buttons/buttonGeneralBase';
import type { Modal } from './modal';

export class ModalButtonConfirm extends ButtonGeneralBase
{
    constructor(private modal: Modal)
    {
        super();
    }

    override setCommand(command: AsyncCommand)
    {
        super.setCommand(command);

        command.onIdle(() =>
        {
            this.modal.enable();
        }, this.disposeToken);

        command.onExecuting(() =>
        {
            this.modal.disable();
        }, this.disposeToken);

        command.onExecuted(() =>
        {
            this.modal.close();
        }, this.disposeToken);
    }
}
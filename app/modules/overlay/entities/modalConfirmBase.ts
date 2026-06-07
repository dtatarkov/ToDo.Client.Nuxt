import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { ModalConfirm } from './modalConfirm';
import { ModalBase } from './modalBase';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import { CommandState } from '@/modules/shared/enums/commandState';


export class ModalConfirmBase<Content extends UIElement> extends ModalBase<Content> implements ModalConfirm<Content>
{
    private buttonConfirm: ButtonGeneral;
    private buttonCancel: ButtonGeneral;
    private confirmCommand: AsyncCommand | undefined;

    constructor(
        private buttonsFactory: ButtonsFactory
    )
    {
        super();

        this.buttonCancel = this.createButtonCancel();
        this.buttonConfirm = this.createButtonConfirm();

        this.controls.push(this.buttonCancel, this.buttonConfirm);

        this.toEditMode();
    }

    override get isDisabled()
    {
        return super.isDisabled;
    }

    override set isDisabled(value: boolean)
    {
        super.isDisabled = value;

        this.buttonConfirm.isDisabled = value;
        this.buttonCancel.isDisabled = value;
    }

    setConfirmCommand(command: AsyncCommand): void
    {
        this.confirmCommand = command;

        this.setupConfirmCommand(command);
    }

    toAddMode()
    {
        this.buttonConfirm.title = 'Добавить';
    }

    toEditMode()
    {
        this.buttonConfirm.title = 'Сохранить';
    }

    private createButtonConfirm()
    {
        const button = this.buttonsFactory.createButtonGeneral();

        button.color = 'primary';

        button.setClickHandler(() =>
        {
            this.confirmCommand?.executeAsync();
        });

        return button;
    }

    private createButtonCancel()
    {
        const button = this.buttonsFactory.createButtonGeneral();

        button.title = 'Отменить';

        button.setClickHandler(() =>
        {
            this.close();
        });

        return button;
    }

    private setupConfirmCommand(command: AsyncCommand)
    {
        command.on({
            stateChange: (state) =>
            {
                const isBusy = state === CommandState.busy;

                this.isDisabled = isBusy;
                this.buttonConfirm.isLoading = isBusy;
            },

            result: (result) =>
            {
                if (result)
                {
                    this.close();
                }
            }
        });
    }
}

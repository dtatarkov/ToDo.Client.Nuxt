import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { ModalConfirm } from './modalConfirm';
import { ModalBase } from './modalBase';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';


export class ModalConfirmBase<Content extends UIElement> extends ModalBase<Content> implements ModalConfirm<Content>
{
    private buttonConfirmInternal: ButtonGeneral;
    private buttonCancelInternal: ButtonGeneral;
    private confirmCommand: AsyncCommand<boolean> | undefined;

    constructor(
        private buttonsFactory: ButtonsFactory
    )
    {
        super();

        this.buttonCancelInternal = this.createButtonCancelDefault();
        this.buttonConfirmInternal = this.createButtonConfirmDefault();

        this.controls.push(this.buttonCancelInternal, this.buttonConfirmInternal);

        this.toEditMode();
    }

    get buttonConfirm(): ButtonGeneral
    {
        this.destroyToken.assertNotDestroyed();
        return this.buttonConfirmInternal;
    }

    get buttonCancel(): ButtonGeneral
    {
        this.destroyToken.assertNotDestroyed();
        return this.buttonCancelInternal;
    }

    override get isDisabled()
    {
        return super.isDisabled;
    }

    override set isDisabled(value: boolean)
    {
        super.isDisabled = value;

        this.buttonConfirmInternal.isDisabled = value;
        this.buttonCancelInternal.isDisabled = value;
    }

    setConfirmCommand(command: AsyncCommand<boolean>): void
    {
        this.confirmCommand = command;

        command.setExecutionHandler(async (resultPromise) =>
        {
            this.isDisabled = true;
            this.buttonConfirm.isLoading = true;

            try
            {
                const result = await resultPromise;

                if (result)
                {
                    this.close();
                }
            }
            finally
            {
                this.isDisabled = false;
                this.buttonConfirm.isLoading = false;
            }
        });
    }

    toAddMode()
    {
        this.buttonConfirmInternal.title = 'Добавить';
    }

    toEditMode()
    {
        this.buttonConfirmInternal.title = 'Сохранить';
    }

    private createButtonConfirmDefault()
    {
        const button = this.buttonsFactory.createButtonGeneral();

        button.color = 'primary';
        button.setClickHandler(() => this.handleConfirmButtonClick());

        return button;
    }

    private createButtonCancelDefault()
    {
        const button = this.buttonsFactory.createButtonGeneral();

        button.title = 'Отменить';
        button.setClickHandler(() => this.handleCancelButtonClick());

        return button;
    }

    protected handleConfirmButtonClick()
    {
        this.confirmCommand?.executeAsync();
    }

    protected handleCancelButtonClick()
    {
        this.close();
    }
}

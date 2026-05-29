import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { ModalConfirm } from './modalConfirm';
import { ModalBase } from './modalBase';
import type { ActionUIElement } from '@/modules/uikit/entities/actionUIElement';
import { UIElementActionState } from '@/modules/uikit/entities/uiElementAction';


export class ModalConfirmBase<Content extends ActionUIElement> extends ModalBase<Content> implements ModalConfirm<Content>
{
    private buttonConfirmInternal: ButtonGeneralViewmodel;
    private buttonCancelInternal: ButtonGeneralViewmodel;

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

    get buttonConfirm(): ButtonGeneralViewmodel
    {
        this.destroyToken.assertNotDestroyed();
        return this.buttonConfirmInternal;
    }

    get buttonCancel(): ButtonGeneralViewmodel
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

    override get content(): Content | undefined
    {
        return super.content;
    }

    override set content(content: Content | undefined)
    {
        super.content = content;

        if (content)
        {
            content.action.setActionStateChangeHandler(state =>
            {
                this.isDisabled = state == UIElementActionState.processing;
                this.buttonConfirm.isLoading = state == UIElementActionState.processing;

                if (state == UIElementActionState.finishedProcessing)
                {
                    this.close();
                }
            });
        }
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
        if (this.content)
        {
            this.content.action.executeAsync();
        }
    }

    protected handleCancelButtonClick()
    {
        this.close();
    }
}

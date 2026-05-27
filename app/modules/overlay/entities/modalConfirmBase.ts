import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import type { ModalConfirm } from './modalConfirm';
import { ModalBase } from './modalBase';


export class ModalConfirmBase<Content extends Viewmodel = Viewmodel> extends ModalBase<Content> implements ModalConfirm<Content>
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

        this.setEditButton();
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

    override set isDisabled(value: boolean)
    {
        super.isDisabled = value;

        this.buttonConfirmInternal.isDisabled = value;
        this.buttonCancelInternal.isDisabled = value;
    }

    setAddButton()
    {
        this.buttonConfirmInternal.title = 'Добавить';
    }

    setEditButton()
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
    }

    protected handleCancelButtonClick()
    {
        this.close();
    }
}

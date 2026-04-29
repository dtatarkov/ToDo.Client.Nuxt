import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ModalViewmodelImpl } from './modalViewmodelImpl';

export class ModalConfirmViewmodelImpl extends ModalViewmodelImpl
{
    private buttonConfirmInternal: ButtonGeneralViewmodel | undefined;
    private buttonCancelInternal: ButtonGeneralViewmodel | undefined;

    constructor(protected uikitElementsFactory: UIKitViewmodelsFactory)
    {
        super();

        this.buttonConfirmInternal = this.createButtonConfirm();
        this.buttonCancelInternal = this.createButtonCancel();

        this.controls.push(this.buttonCancelInternal, this.buttonConfirmInternal);
    }

    get buttonConfirm(): ButtonGeneralViewmodel
    {
        this.destroyToken.assertNotDestroyed();
        return this.buttonConfirmInternal as ButtonGeneralViewmodel;
    }

    get buttonCancel(): ButtonGeneralViewmodel
    {
        this.destroyToken.assertNotDestroyed();
        return this.buttonCancelInternal as ButtonGeneralViewmodel;
    }

    protected override handleClose(): void
    {
        super.handleClose();

        this.buttonConfirmInternal?.destroy();
        this.buttonCancelInternal?.destroy();
    }

    protected createButtonConfirm(): ButtonGeneralViewmodel
    {
        const buttonConfirm = this.uikitElementsFactory.createButtonGeneral({
            title: 'Сохранить',
            color: 'primary'
        });

        return buttonConfirm;
    }

    protected createButtonCancel(): ButtonGeneralViewmodel
    {
        const buttonCancel = this.uikitElementsFactory.createButtonGeneral({
            title: 'Отменить'
        });

        buttonCancel.click.subscribe(() =>
        {
            this.close();
        });

        return buttonCancel;
    }
}


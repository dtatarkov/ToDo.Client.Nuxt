import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ModalViewmodelImpl } from './modalViewmodelImpl';

export class ModalConfirmViewmodelImpl extends ModalViewmodelImpl
{
    private _buttonConfirm: ButtonGeneralViewmodel | undefined;
    private _buttonCancel: ButtonGeneralViewmodel | undefined;

    constructor(protected uikitElementsFactory: UIKitViewmodelsFactory)
    {
        super();

        this._buttonConfirm = this.createButtonConfirm();
        this._buttonCancel = this.createButtonCancel();

        this.controls.push(this._buttonCancel, this._buttonConfirm);
    }

    get buttonConfirm(): ButtonGeneralViewmodel
    {
        this.destroyToken.assertNotDestroyed();
        return this._buttonConfirm as ButtonGeneralViewmodel;
    }

    get buttonCancel(): ButtonGeneralViewmodel
    {
        this.destroyToken.assertNotDestroyed();
        return this._buttonCancel as ButtonGeneralViewmodel;
    }

    protected override handleClose(): void
    {
        super.handleClose();

        this._buttonConfirm?.destroy();
        this._buttonCancel?.destroy();
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


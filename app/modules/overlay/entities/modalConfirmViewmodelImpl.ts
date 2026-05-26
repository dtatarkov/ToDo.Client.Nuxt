import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import { ModalViewmodelImpl } from './modalViewmodelImpl';
import { EffectsContainerImpl } from '@/modules/shared/entities/effectsContainerImpl';
import type { ButtonsFactory } from '@/modules/uikit/interfaces/buttonsFactory';

export class ModalConfirmViewmodelImpl extends ModalViewmodelImpl
{
    private buttonConfirmInternal: ButtonGeneralViewmodel;
    private buttonCancelInternal: ButtonGeneralViewmodel;

    protected effectsContainer = new EffectsContainerImpl();

    constructor(protected buttonsFactory: ButtonsFactory)
    {
        super();

        this.buttonConfirmInternal = this.createButtonConfirm();
        this.buttonCancelInternal = this.createButtonCancel();

        this.controls.push(this.buttonCancelInternal, this.buttonConfirmInternal);
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

    protected override handleDestroy(): void
    {
        super.handleDestroy();
        this.effectsContainer.destroy();
    }

    protected createButtonConfirm(): ButtonGeneralViewmodel
    {
        const buttonConfirm = this.buttonsFactory.createButtonGeneral({
            title: 'Сохранить',
            color: 'primary',

            click: () => this.handleButtonConfirmClick()
        });

        return buttonConfirm;
    }

    protected createButtonCancel(): ButtonGeneralViewmodel
    {
        const buttonCancel = this.buttonsFactory.createButtonGeneral({
            title: 'Отменить',

            click: () => this.handleButtonCancelClick()
        });

        return buttonCancel;
    }

    protected handleButtonConfirmClick() { }

    protected handleButtonCancelClick()
    {
        this.close();
    }
}


import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import { ModalConfirmViewmodelImpl } from './modalConfirmViewmodelImpl';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export class ModalConfirmFormViewmodelImpl extends ModalConfirmViewmodelImpl
{
    constructor(
        protected form: FormViewmodel,
        uikitElementsFactory: UIKitViewmodelsFactory
    )
    {
        super(uikitElementsFactory);

        form.onDisabledStateChange.subscribe(isDisabled =>
        {
            this.buttonConfirm.isDisabled = isDisabled;
            this.buttonConfirm.isLoading = isDisabled;
            this.buttonCancel.isDisabled = isDisabled;
            this.isDisabled = isDisabled;
        });
    }

    protected override createButtonConfirm(): ButtonGeneralViewmodel
    {
        const buttonConfirm = super.createButtonConfirm();

        buttonConfirm.click.subscribe(() =>
        {
            this.form.submit();
        });

        return buttonConfirm;
    }
}

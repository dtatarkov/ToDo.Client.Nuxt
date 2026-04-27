import type { ButtonViewmodelGeneral } from '@/modules/uikit/interfaces/buttonViewmodelGeneral';
import { ModalConfirmBase } from './modalConfirmBase';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export class ModalConfirmForm extends ModalConfirmBase
{
    constructor(
        protected form: FormViewmodel,
        uikitElementsFactory: UIKitViewmodelsFactory
    )
    {
        super(uikitElementsFactory);
    }

    override init(): void
    {
        super.init();

        this.form.onDisabledStateChange.subscribe(isDisabled =>
        {
            this.buttonConfirm.isDisabled = isDisabled;
            this.buttonConfirm.isLoading = isDisabled;
        });
    }

    protected override createButtonConfirm(): ButtonViewmodelGeneral
    {
        const buttonConfirm = super.createButtonConfirm();

        buttonConfirm.click.subscribe(() =>
        {
            this.form.submit();
        });

        return buttonConfirm;
    }
}

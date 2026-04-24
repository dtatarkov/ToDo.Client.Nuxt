import type { ButtonElement } from '@/modules/uikit/interfaces/buttonElement';
import { ModalConfirmBase } from './modalConfirmBase';
import type { UIKitElementsFactory } from '@/modules/uikit/interfaces/uiKitElementsFactory';
import { Form } from '@/modules/forms/interfaces/form';

export class ModalConfirmForm extends ModalConfirmBase
{
    constructor(
        protected form: Form,
        uikitElementsFactory: UIKitElementsFactory
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

    protected override createButtonConfirm(): ButtonElement
    {
        const buttonConfirm = super.createButtonConfirm();

        buttonConfirm.click.subscribe(() =>
        {
            this.form.submit();
        });

        return buttonConfirm;
    }
}

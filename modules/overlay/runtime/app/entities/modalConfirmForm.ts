import { ModalConfirmBase } from './modalConfirmBase';


export class ModalConfirmForm extends ModalConfirmBase
{
    constructor(
        protected form: Form,
        uikitElementsFactory: UIKitElementsFactory
    )
    {
        super(uikitElementsFactory);
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

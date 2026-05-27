import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ModalConfirmBase } from './modalConfirmBase';

export class ModalConfirmForm extends ModalConfirmBase<FormViewmodel>
{
    constructor(
        buttonsFactory: ButtonsFactory
    )
    {
        super(buttonsFactory);

        this.title = 'Редактирование';
    }

    override set content(form: FormViewmodel | undefined)
    {
        super.content = form;

        if (form)
        {
            form.setDisabledStateChangeHandler(isDisabled =>
            {
                this.isDisabled = isDisabled;
            });

            form.setSubmittingStateChangeHandler(isSubmitting =>
            {
                this.buttonConfirm.isLoading = isSubmitting;
            });

            form.setSubmittedHandler(() =>
            {
                this.close();
            });
        }
    }

    protected override handleConfirmButtonClick()
    {
        super.handleConfirmButtonClick();

        this.content?.submit();
    }
}
import { ModalConfirmViewmodelImpl } from './modalConfirmViewmodelImpl';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';
import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';

export class ModalConfirmFormViewmodelImpl extends ModalConfirmViewmodelImpl
{
    private loaderTimeout: NodeJS.Timeout | undefined;

    constructor(
        buttonsFactory: ButtonsFactory,
        private config: AppPublicRuntimeConfig,
        protected form: FormViewmodel,
    )
    {
        super(buttonsFactory);

        this.content = form;

        form.setDisabledStateChangeHandler(isDisabled =>
        {
            this.buttonConfirm.isDisabled = isDisabled;

            this.buttonCancel.isDisabled = isDisabled;
            this.isDisabled = isDisabled;

            this.toggleLoader(isDisabled);
        });

        form.setSubmittedHandler(() =>
        {
            this.close();
        });
    }

    protected override handleDestroy(): void
    {
        super.handleDestroy();
        this.toggleLoader(false);
    }

    private toggleLoader(isLoaderEnabled: boolean)
    {
        if (isLoaderEnabled)
        {
            this.loaderTimeout = setTimeout(() =>
            {
                this.buttonConfirm.isLoading = isLoaderEnabled;
            }, this.config.longTaskSpinnerDelay);
        }
        else
        {
            if (this.loaderTimeout)
            {
                clearTimeout(this.loaderTimeout);
                this.loaderTimeout = undefined;
            }
        }
    }

    protected override handleButtonConfirmClick()
    {
        this.form.submit();
    }
}

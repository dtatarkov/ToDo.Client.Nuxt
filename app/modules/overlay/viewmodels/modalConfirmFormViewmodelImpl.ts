import { ModalConfirmViewmodelImpl } from './modalConfirmViewmodelImpl';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';

export class ModalConfirmFormViewmodelImpl extends ModalConfirmViewmodelImpl
{
    private loaderTimeout: NodeJS.Timeout | undefined;

    constructor(
        uikitElementsFactory: UIKitViewmodelsFactory,
        private config: AppPublicRuntimeConfig,
        protected form: FormViewmodel,
    )
    {
        super(uikitElementsFactory);

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

import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
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

        form.onDisabledStateChange.subscribe(isDisabled =>
        {
            this.buttonConfirm.isDisabled = isDisabled;

            this.buttonCancel.isDisabled = isDisabled;
            this.isDisabled = isDisabled;

            this.toggleLoader(isDisabled);
        });

        form.onSubmitted.subscribe(() =>
        {
            this.close();
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
}

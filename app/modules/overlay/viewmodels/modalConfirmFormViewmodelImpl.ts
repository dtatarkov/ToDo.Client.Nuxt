import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import { ModalConfirmViewmodelImpl } from './modalConfirmViewmodelImpl';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export class ModalConfirmFormViewmodelImpl extends ModalConfirmViewmodelImpl
{
    private loaderTimeout: NodeJS.Timeout | undefined;

    constructor(
        protected form: FormViewmodel,
        uikitElementsFactory: UIKitViewmodelsFactory
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
            }, 500);
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

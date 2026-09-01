import { ModalViewmodelsFactory, type ModalConfiguration } from './modalViewmodelsFactory';
import { ModalViewmodelImpl } from '../viewmodels/modalViewmodelImpl';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import { ModalButtonConfirmConfiguratorBase } from '../entities/modalButtonConfirmConfiguratorBase';
import { UIKitViewmodelsFactory } from '@client/ui-uikit';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import { dependency } from '@client/infrastructure-di';

@dependency(UIKitViewmodelsFactory)
export class ModalViewmodelsFactoryImpl extends ModalViewmodelsFactory
{
    constructor(
        private uikitFactory: UIKitViewmodelsFactory
    )
    {
        super();
    }

    override create<TContentData extends Record<string, any> = Record<string, any>>(
        configuration: ModalConfiguration<TContentData>,
        onClose?: () => void
    ): ModalViewmodel<TContentData>
    {
        const buttonConfirm = this.createButtonConfirm(configuration);
        const buttonCancel = this.createButtonCancel(configuration);

        return new ModalViewmodelImpl({
            content: configuration.content,
            title: configuration.title,
            description: configuration.description,
            buttonConfirm,
            buttonCancel,
            onClose,
        });
    }

    private createButtonConfirm<TContentData extends Record<string, any> = Record<string, any>>(
        configuration: ModalConfiguration<TContentData>
    ): ButtonGeneralViewmodel | undefined
    {
        if (!configuration.buttonConfirm)
        {
            return undefined;
        }

        const button = this.uikitFactory.createButtonGeneral();
        const configurator = new ModalButtonConfirmConfiguratorBase(button);

        return configuration.buttonConfirm(configurator);
    }

    private createButtonCancel<TContentData extends Record<string, any> = Record<string, any>>(
        configuration: ModalConfiguration<TContentData>
    ): ButtonGeneralViewmodel | undefined
    {
        if (configuration.buttonCancel !== true)
        {
            return undefined;
        }

        const button = this.uikitFactory.createButtonGeneral();
        button.setTitle('button.cancel');

        return button;
    }
}
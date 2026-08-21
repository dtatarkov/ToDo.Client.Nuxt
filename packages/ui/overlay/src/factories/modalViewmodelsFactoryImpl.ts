import type { Viewmodel } from '@client/ui-core';
import { ModalViewmodelsFactory, type ModalConfiguration } from './modalViewmodelsFactory';
import { ModalViewmodelImpl } from '../viewmodels/modalViewmodelImpl';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import { ModalButtonConfirmConfiguratorBase } from '../entities/modalButtonConfirmConfiguratorBase';
import type { UIKitViewmodelsFactory } from '@client/ui-uikit';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';

export class ModalViewmodelsFactoryImpl extends ModalViewmodelsFactory
{
    constructor(
        private uikitFactory: UIKitViewmodelsFactory
    )
    {
        super();
    }

    override create<TContent extends Viewmodel<any> = Viewmodel<any>>(
        configuration: ModalConfiguration<TContent>
    ): ModalViewmodel<TContent>
    {
        const buttonConfirm = this.createButtonConfirm(configuration);
        const buttonCancel = this.createButtonCancel(configuration);

        return new ModalViewmodelImpl({
            content: configuration.content,
            title: configuration.title,
            description: configuration.description,
            buttonConfirm,
            buttonCancel,
        });
    }

    private createButtonConfirm<TContent extends Viewmodel<any>>(
        configuration: ModalConfiguration<TContent>
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

    private createButtonCancel<TContent extends Viewmodel<any>>(
        configuration: ModalConfiguration<TContent>
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
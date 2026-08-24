import type { RenderableViewmodel } from '@client/ui-core';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import type { ModalButtonConfirmConfigurator } from '../entities/modalButtonConfirmConfigurator';
import type { Func } from '@client/shared';

export type ModalConfiguration<TContentData extends Record<string, any> = Record<string, any>> = {
    title: string;
    description?: string;
    content: RenderableViewmodel<TContentData>;
    buttonConfirm?: Func<ButtonGeneralViewmodel, [ModalButtonConfirmConfigurator]>;
    buttonCancel?: boolean;
};

export abstract class ModalViewmodelsFactory
{
    abstract create<TContentData extends Record<string, any> = Record<string, any>>(
        configuration: ModalConfiguration<TContentData>,
        onClose?: () => void
    ): ModalViewmodel<TContentData>;
}

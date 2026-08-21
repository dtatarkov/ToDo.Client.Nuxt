import type { Viewmodel } from '@client/ui-core';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import type { ModalButtonConfirmConfigurator } from '../entities/modalButtonConfirmConfigurator';
import type { Func } from '@client/shared';

export type ModalConfiguration<TContent extends Viewmodel<any> = Viewmodel<any>> = {
    title: string;
    description?: string;
    content: TContent;
    buttonConfirm?: Func<ButtonGeneralViewmodel, [ModalButtonConfirmConfigurator]>;
    buttonCancel?: boolean;
};

export abstract class ModalViewmodelsFactory
{
    abstract create<TContent extends Viewmodel<any> = Viewmodel<any>>(
        configuration: ModalConfiguration<TContent>
    ): ModalViewmodel<TContent>;
}

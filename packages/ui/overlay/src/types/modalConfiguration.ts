import type { Viewmodel } from '@client/ui-core';
import type { Func } from '@client/shared';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import type { ModalButtonConfirmConfigurator } from '../configuration/modalButtonConfirmConfigurator';

export type ModalConfiguration<TContent extends Viewmodel<any> = Viewmodel<any>> = {
    title: string;
    description?: string;
    content: TContent;
    buttonConfirm?: Func<ButtonGeneralViewmodel, [ModalButtonConfirmConfigurator]>;
    buttonCancel?: boolean;
};

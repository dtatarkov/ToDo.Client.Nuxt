import type { Viewmodel } from '@client/ui-core';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';

export type ModalViewmodelOptions<TContentData extends Record<string, any>> = {
    content: Viewmodel<TContentData>;
    title?: string;
    description?: string;
    buttonConfirm?: ButtonGeneralViewmodel;
    buttonCancel?: ButtonGeneralViewmodel;
};

import type { ButtonGeneralData } from '@client/ui-uikit';

export type ModalData<TContentData = Record<string, any>> = {
    title: string;
    description: string;
    content: TContentData;
    buttonConfirm: ButtonGeneralData | undefined;
    buttonCancel: ButtonGeneralData | undefined;
    isDisabled: boolean;
};
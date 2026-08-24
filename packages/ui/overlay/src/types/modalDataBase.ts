import type { ButtonGeneralData } from '@client/ui-uikit';
import type { ModalContentData } from './modalContentData';

export type ModalDataBase<
    TContent extends Partial<ModalContentData<any>> = ModalContentData<Record<string, any>>,
    TButton extends Partial<ButtonGeneralData> = ButtonGeneralData
> = {
    title: string;
    description: string;
    content: TContent;
    isInline: boolean;
    buttonConfirm: TButton | undefined;
    buttonCancel: TButton | undefined;
    isDisabled: boolean;
};

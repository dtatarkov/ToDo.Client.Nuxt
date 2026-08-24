import type { ButtonGeneralData } from '@client/ui-uikit';
import type { ModalContentData } from './modalContentData';
import type { ModalDataBase } from './modalDataBase';

export type ModalDataPartial<TContentData extends Record<string, any> = Record<string, any>> =
    Partial<ModalDataBase<Partial<ModalContentData<Partial<TContentData>>>, Partial<ButtonGeneralData>>>;

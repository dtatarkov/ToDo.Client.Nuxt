import type { ModalContentData } from './modalContentData';
import type { ModalDataBase } from './modalDataBase';

export type ModalDataFull<TContentData extends Record<string, any> = Record<string, any>> =
    ModalDataBase<ModalContentData<TContentData>>;

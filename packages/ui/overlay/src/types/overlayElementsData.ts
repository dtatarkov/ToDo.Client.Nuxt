import type { OverlayElementType } from '../enums/overlayElementType';
import type { ModalData } from './modalData';

export type OverlayElementsData =
    | (ModalData & { elementType: OverlayElementType.modal; });

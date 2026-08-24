import type { OverlayElementType } from '../enums/overlayElementType';
import type { ModalDataFull } from './modalDataFull';

export type OverlayElementsData =
    | (ModalDataFull & { elementType: OverlayElementType.modal; });

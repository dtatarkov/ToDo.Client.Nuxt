import type { OverlayElementType } from '../enums/overlayElementType';

export type OverlayElementData<TData extends Record<string, any> = Record<string, any>> = {
    elementType: OverlayElementType;
} & TData;

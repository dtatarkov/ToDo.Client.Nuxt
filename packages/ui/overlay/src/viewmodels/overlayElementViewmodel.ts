import { Viewmodel } from '@client/ui-core';
import type { OverlayElementData } from '../types/overlayElementData';

export abstract class OverlayElementViewmodel<TData extends Record<string, any> = Record<string, any>>
    extends Viewmodel<OverlayElementData<TData>>
{
    abstract close(): void;
}

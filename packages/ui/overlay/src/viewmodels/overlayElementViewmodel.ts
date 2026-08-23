import { Viewmodel } from '@client/ui-core';
import type { OverlayElementData } from '../types/overlayElementData';

export abstract class OverlayElementViewmodel<TData extends OverlayElementData = OverlayElementData>
    extends Viewmodel<TData>
{
    abstract close(): void;
}

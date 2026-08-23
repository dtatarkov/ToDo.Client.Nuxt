import { OverlayElementViewmodel } from './overlayElementViewmodel';
import type { ModalData } from '../types/modalData';

export abstract class ModalViewmodel<TContentData>
    extends OverlayElementViewmodel<ModalData<TContentData>>
{
    abstract enable(): void;
    abstract disable(): void;
}

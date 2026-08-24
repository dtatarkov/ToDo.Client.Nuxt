import { OverlayElementViewmodel } from './overlayElementViewmodel';
import type { ModalDataFull } from '../types/modalDataFull';

export abstract class ModalViewmodel<TContentData extends Record<string, any>>
    extends OverlayElementViewmodel<ModalDataFull<TContentData>>
{
    abstract enable(): void;
    abstract disable(): void;
}

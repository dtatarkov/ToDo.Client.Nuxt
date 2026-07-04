import type { OverlayElement } from '../entities/overlayElement';
import { OverlayElementExceptionBase } from './overlayElementExceptionBase';

export class OverlayElementExceptionNotFound extends OverlayElementExceptionBase
{
    constructor(
        overlayElement: OverlayElement
    )
    {
        super('OverlayElement does not exist in Overlay', overlayElement);
    }
}
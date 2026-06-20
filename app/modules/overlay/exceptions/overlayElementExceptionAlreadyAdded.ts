import type { OverlayElement } from '../entities/overlayElement';
import { OverlayElementExceptionBase } from './overlayElementExceptionBase';

export class OverlayElementExceptionAlreadyAdded extends OverlayElementExceptionBase
{
    constructor(
        overlayElement: OverlayElement
    )
    {
        super('OverlayElement already added', overlayElement);
    }
}
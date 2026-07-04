import type { OverlayElement } from '../entities/overlayElement';


export class OverlayElementExceptionBase extends Error
{
    overlayElementData: Record<string, any>;

    constructor(
        message: string,
        overlayElement: OverlayElement
    )
    {
        super(message);

        this.overlayElementData = overlayElement.getData();
    }
}

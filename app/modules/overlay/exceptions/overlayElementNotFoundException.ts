export class OverlayElementNotFoundException extends Error
{
    constructor()
    {
        super('OverlayElement does not exist in Overlay');
    }
}
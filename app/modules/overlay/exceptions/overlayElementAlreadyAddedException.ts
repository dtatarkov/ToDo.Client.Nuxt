export class OverlayElementAlreadyAddedException extends Error
{
    constructor()
    {
        super('OverlayElement already added');
    }
}
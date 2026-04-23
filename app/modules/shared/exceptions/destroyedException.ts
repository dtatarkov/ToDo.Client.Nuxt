export class DestroyedException extends Error
{
    constructor()
    {
        super('Object is destroyed');
    }
}
export class DisposedException extends Error
{
    constructor()
    {
        super('Object is disposed');
    }
}
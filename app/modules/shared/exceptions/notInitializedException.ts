export class NotInitializedException extends Error
{
    constructor()
    {
        super('Object is not initialized');
    }
}
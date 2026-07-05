export class InitializedException extends Error
{
    constructor()
    {
        super('Object is already initialized');
    }
}
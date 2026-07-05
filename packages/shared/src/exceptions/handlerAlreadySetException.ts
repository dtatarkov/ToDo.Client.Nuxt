export class HandlerAlreadySetException extends Error
{
    constructor()
    {
        super('Handler is already set');
    }
}
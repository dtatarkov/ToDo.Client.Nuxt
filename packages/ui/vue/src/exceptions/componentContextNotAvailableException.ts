export class ComponentContextNotAvailableException extends Error
{
    constructor()
    {
        super('Component context not available');
    }
}
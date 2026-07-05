export class ReadonlyRefValueChangeException extends Error
{
    constructor()
    {
        super('Ref is readonly and cannot be set');
    }
}
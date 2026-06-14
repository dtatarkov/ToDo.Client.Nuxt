export class ReadonlyRefValueChangeException extends Error
{
    constructor(refName: string)
    {
        super(`"${refName}" ref is readonly and cannot be set`);
    }
}
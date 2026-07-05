export class InitializationOnlyException extends Error
{
    constructor(propertyName: string)
    {
        super(`"${propertyName}" can be set only once`);
    }
}
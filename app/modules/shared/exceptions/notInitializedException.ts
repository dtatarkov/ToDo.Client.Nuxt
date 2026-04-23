
export class NotInitializedException extends Error
{
    constructor(instance: object)
    {
        super(`${instance.constructor.name} is not initialized`);
    }
}

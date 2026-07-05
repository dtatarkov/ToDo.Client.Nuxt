export class UnknownErrorException extends Error
{
    constructor(message?: string)
    {
        super(message ?? 'An unknown error occurred');
    }
}
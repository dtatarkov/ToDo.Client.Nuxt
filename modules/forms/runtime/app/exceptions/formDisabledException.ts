export class FormDisabledException extends Error
{
    constructor()
    {
        super('Form is blocked');
    }
}
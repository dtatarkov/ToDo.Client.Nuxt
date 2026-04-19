export class FormBlockedException extends Error
{
    constructor()
    {
        super('Form is blocked');
    }
}
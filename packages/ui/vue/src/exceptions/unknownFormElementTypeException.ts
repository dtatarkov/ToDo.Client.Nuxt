import type { FormElementType } from '@client/ui-forms';

export class UnknownFormElementTypeException extends Error
{
    constructor(type: FormElementType)
    {
        super(`Unknown form element type: ${type}`);
    }
}

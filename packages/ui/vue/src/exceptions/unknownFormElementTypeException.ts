import type { FormElementType } from '@client/ui-core';

export class UnknownFormElementTypeException extends Error
{
    constructor(type: FormElementType)
    {
        super(`Unknown form element type: ${type}`);
    }
}

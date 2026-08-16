import type { InputType } from '../enums/inputType';

export class UnknownInputTypeException extends Error
{
    constructor(type?: InputType)
    {
        super(`Unknown input type: ${type ?? 'unknown'}`);
    }
}

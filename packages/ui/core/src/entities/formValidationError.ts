import type { FormElementValidationError } from './formElementValidationError';

export class FormValidationError
{
    constructor(
        public readonly errors: FormElementValidationError[]
    ) { }

    toString(): string
    {
        return this.errors
            .map(error => error.toString())
            .join('\n');
    }
}
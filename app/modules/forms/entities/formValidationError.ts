import type { ValidationError } from '@/modules/shared/entities/validationError';

export class FormValidationError
{
    constructor(
        public readonly errors: ValidationError[]
    ) { }

    toString(): string
    {
        return this.errors
            .map(error => `- ${error.message}`)
            .join('\n');
    }
}
import type { ValidationError } from '@/modules/validation/entities/validationError';

export class FormValidationError
{
    constructor(
        public readonly errors: ValidationError[]
    ) { }
}
import { ValidationError } from '@/modules/shared/entities/validationError';

export class FormElementValidationError extends ValidationError
{
    constructor(
        public readonly formElementLabel: string,
        message: string,
    )
    {
        super(message);
    }

    override toString(): string
    {
        return `${this.formElementLabel}:` + '\n' +
            `- ${this.message}`;
    }
}
import type { ValidationMessage } from '@client/infrastructure-validation';

export abstract class EntityFieldScheme<TValue>
{
    abstract validate(value: any): ValidationMessage[];
    abstract tryParse(value: any): { value: TValue; } | { errors: ValidationMessage[]; };
    abstract parse(value: any): TValue;
}

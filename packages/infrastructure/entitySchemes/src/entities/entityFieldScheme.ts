import type { ValidationMessage } from '@client/infrastructure-validation';

export abstract class EntityFieldScheme<TValue>
{
    abstract validate(value: any): ValidationMessage[];
    abstract parse(value: any): TValue;
}

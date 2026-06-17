import type { ValidationError } from './validationError';


export abstract class EntityFieldScheme<TValue = any>
{
    abstract validate(value: TValue): ValidationError | undefined;
}

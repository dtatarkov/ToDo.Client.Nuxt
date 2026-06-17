import type { ValidationError } from '../../shared/entities/validationError';


export abstract class EntityFieldScheme<TValue = any>
{
    abstract validate(value: TValue): ValidationError | undefined;
}

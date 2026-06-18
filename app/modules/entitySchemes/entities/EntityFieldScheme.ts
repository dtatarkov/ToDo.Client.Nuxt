import type { ValidationError } from '../../shared/entities/validationError';
import type { FormElementCreateData } from '@/modules/forms/types/formElementCreateData';


export abstract class EntityFieldScheme<TValue = any>
{
    abstract validate(value: TValue): ValidationError | undefined;
    abstract getFormElementData(): FormElementCreateData | undefined;
}

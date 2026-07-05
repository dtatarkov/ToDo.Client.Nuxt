import type { FormElementCreateData } from '@/modules/forms/types/formElementCreateData';
import type { ValidationError } from '@packages/shared';


export abstract class EntityFieldScheme<TValue = any>
{
    abstract validate(value: TValue): ValidationError | undefined;
    abstract getFormElementData(): FormElementCreateData | undefined;
}

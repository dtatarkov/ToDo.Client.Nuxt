import type { ValidationError } from '@client/shared';


export abstract class EntityFieldScheme<TValue = any>
{
    abstract validate(value: TValue): ValidationError | undefined;
    //abstract getFormElementData(): FormElementCreateData | undefined;
}

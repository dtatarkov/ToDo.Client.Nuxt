import type { ValidationError } from '@/modules/shared/entities/validationError';
import type { FormElementType } from '../enums/formElementType';

export type FormElementGenericCreateData<
    TInputElementData,
    TType extends FormElementType,
    V
> = Partial<Omit<TInputElementData, 'name'>> & {
    type: TType;
    label?: string;
    validate?: (value: V) => ValidationError | undefined;
};
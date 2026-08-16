import { Viewmodel } from '@client/ui-core';
import type { FormElementValidationError } from '../entities/formElementValidationError';
import type { FormElementValue } from '../types/formElementValue';
import type { FormElementDataForType } from '../types/formElementDataForType';
import type { InputType } from '@client/ui-uikit';
import type { FormElementStateForType } from '../types/formElementStateForType';

export abstract class FormElementViewmodel<TType extends InputType = any>
    extends Viewmodel<FormElementStateForType<TType>>
{
    abstract readonly name: string;
    abstract value: FormElementValue<TType>;

    abstract disable(): void;
    abstract enable(): void;
    abstract setData(data: FormElementDataForType<TType>): void;
    abstract setDefaultValue(): void;
    abstract validate(): void;
    abstract isValid(): boolean;
    abstract getError(): FormElementValidationError | undefined;
}

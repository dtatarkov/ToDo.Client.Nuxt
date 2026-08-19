import { Viewmodel } from '@client/ui-core';
import type { FormElementValue } from '../types/formElementValue';
import type { FormElementDataForType } from '../types/formElementDataForType';
import type { FormElementDataChanges } from '../types/formElementDataChanges';
import type { InputType } from '@client/ui-uikit';

export abstract class FormElementViewmodel<TType extends InputType = any>
    extends Viewmodel<FormElementDataForType<TType>>
{
    abstract readonly name: string;
    abstract value: FormElementValue<TType>;

    abstract disable(): void;
    abstract enable(): void;
    abstract setData(data: FormElementDataChanges): void;
    abstract setDefaultValue(): void;
    abstract validate(): void;
}

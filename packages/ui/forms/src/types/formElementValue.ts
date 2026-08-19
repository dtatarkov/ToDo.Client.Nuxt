import type { FormElementData } from './formElementData';
import type { InputType } from '@client/ui-uikit';

export type FormElementValue<TType extends InputType> =
    Extract<FormElementData, { inputType: TType }> extends { value: infer V }
        ? V
        : never;

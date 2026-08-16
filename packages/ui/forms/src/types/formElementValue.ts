import type { FormElementState } from './formElementState';
import type { InputType } from '@client/ui-uikit';

export type FormElementValue<TType extends InputType> =
    Extract<FormElementState, { inputType: TType }> extends { value: infer V }
        ? V
        : never;

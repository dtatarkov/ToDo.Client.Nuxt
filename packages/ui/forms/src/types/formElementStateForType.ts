import type { FormElementState } from './formElementState';
import type { InputType } from '@client/ui-uikit';

export type FormElementStateForType<TType extends InputType> =
    Extract<FormElementState, { inputType: TType }>;

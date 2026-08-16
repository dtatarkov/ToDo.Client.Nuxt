import type { FormElementData } from './formElementData';
import type { InputType } from '@client/ui-uikit';

export type FormElementDataForType<TType extends InputType> =
    Extract<FormElementData, { inputType: TType }>;

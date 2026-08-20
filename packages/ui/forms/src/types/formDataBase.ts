import type { FormElementData } from './formElementData';

export type FormDataBase<TElement extends Partial<FormElementData>> = {
    elements: TElement[];
    isDisabled: boolean;
};

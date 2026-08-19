import type { FormElementData } from './formElementData';


export type FormDataInit = {
    elements?: Partial<FormElementData>[];
    isDisabled?: boolean;
};
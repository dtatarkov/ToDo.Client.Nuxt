import type { FormElementData } from './formElementData';

export type FormElementDataChanges = Partial<Omit<FormElementData, 'inputType'>>;

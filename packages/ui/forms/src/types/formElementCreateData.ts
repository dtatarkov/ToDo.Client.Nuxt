import type { FormElementData } from './formElementData';

type AsCreateData<T> = T extends { name: infer _, hasError: infer _; errorKey?: infer _; }
    ? Omit<T, 'name' | 'hasError' | 'errorKey'>
    : never;

export type FormElementCreateData = Partial<AsCreateData<FormElementData>> & Pick<AsCreateData<FormElementData>, 'inputType'>;
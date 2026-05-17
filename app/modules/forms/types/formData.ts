import type { FormElementViewmodelCreateData } from './formElementViewmodelCreateData';

export type FormData<TEntity extends Record<string, any> = Record<string, any>> = {
    elements?: Partial<Record<keyof TEntity, FormElementViewmodelCreateData>>;
    isDisabled?: boolean;
};
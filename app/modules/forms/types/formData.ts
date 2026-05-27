import type { FormElementCreateData } from './formElementCreateData';

export type FormData<TEntity extends Record<string, any> = Record<string, any>> = {
    elements?: Partial<Record<keyof TEntity, FormElementCreateData>>;
    isDisabled?: boolean;
};
import type { FormElementData } from './formElementData';

export type FormConfig<TEntity extends Record<string, any> = Record<string, any>> = {
    elements: Record<keyof TEntity, FormElementData>;
};
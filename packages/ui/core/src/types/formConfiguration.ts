import type { FormElementData } from './formElementData';

export type FormConfiguration<TEntity extends Record<string, any> = Record<string, any>> = {
    elements: Record<keyof TEntity, FormElementData>;
};
import type { FormElementData } from './formElementData';

export type FormConfiguration<TEntity extends Record<string, any> = Record<string, any>> = {
    elementsData: Record<keyof TEntity, FormElementData>;
};
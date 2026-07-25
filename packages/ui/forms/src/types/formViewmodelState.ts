import type { FormElementValidationError } from '../entities/formElementValidationError';
import type { FormElementData } from './formElementData';

export type FormViewmodelState<TEntity extends Record<string, any>> = {
  elements: Record<keyof TEntity, FormElementData>;
  data?: Record<keyof TEntity, any>;
  errors?: Partial<Record<keyof TEntity, FormElementValidationError>>;
  isDisabled: boolean;
};

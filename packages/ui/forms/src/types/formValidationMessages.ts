import type { ValidationMessage } from '@client/infrastructure-validation';

export type FormValidationMessages<TEntity extends Record<string, any> = Record<string, any>> =
    Partial<Record<keyof TEntity, ValidationMessage[]>>;

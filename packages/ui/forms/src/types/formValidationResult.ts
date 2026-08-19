import type { FormValidationMessages } from './formValidationMessages';

export type FormValidationResult<TEntity extends Record<string, any> = Record<string, any>> = {
    readonly isValid: boolean;
    readonly messages: FormValidationMessages<TEntity>;
};

import type { FormValidationResult } from '../types/formValidationResult';

export abstract class FormValidator<TEntity extends Record<string, any> = Record<string, any>>
{
    abstract validate(): FormValidationResult<TEntity>;
}
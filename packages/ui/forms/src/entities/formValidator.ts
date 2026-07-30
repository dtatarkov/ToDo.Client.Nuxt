import type { FormValidationResult } from '../types/formValidationResult';

export abstract class FormValidator
{
    abstract validate(): FormValidationResult;
}
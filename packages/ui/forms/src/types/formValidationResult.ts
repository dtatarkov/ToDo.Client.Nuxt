import type { FormValidationError } from '../entities/formValidationError';

export type FormValidationResult = {
    readonly isValid: true;
    readonly validationError?: FormValidationError;
} | {
    readonly isValid: false;
    readonly validationError: FormValidationError;
};

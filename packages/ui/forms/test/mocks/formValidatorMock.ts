import { vi } from 'vitest';
import type { FormValidator } from '../../src/entities/formValidator';
import type { FormValidationError } from '../../src/entities/formValidationError';

export const formValidatorMock = {
    validate: vi.fn(),
} satisfies FormValidator;

export function markFormValidatorValid()
{
    formValidatorMock.validate.mockReturnValue({ isValid: true });
}

export function markFormValidatorInvalid(error: FormValidationError)
{
    formValidatorMock.validate.mockReturnValue({ isValid: false, validationError: error });
}

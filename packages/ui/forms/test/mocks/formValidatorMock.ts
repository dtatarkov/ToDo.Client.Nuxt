import { vi } from 'vitest';
import type { FormValidator } from '../../src/entities/formValidator';
import type { FormValidationMessages } from '../../src/types/formValidationMessages';

function createFormValidatorMock()
{
    const mock = {
        validate: vi.fn(),

        markAsValid()
        {
            this.validate.mockReturnValue({ isValid: true, messages: {} });
        },

        markAsInvalid(messages: FormValidationMessages)
        {
            this.validate.mockReturnValue({ isValid: false, messages });
        },
    };

    const result = mock satisfies FormValidator;

    return result;
}

export const formValidatorMock = createFormValidatorMock();

import { vi } from 'vitest';
import type { FormElement } from '../../src/entities/formElement';
import type { FormElementValidationError } from '../../src/entities/formElementValidationError';

export function createFormElementMock<V = unknown>(name: string, initialValue: V)
{
    return {
        name,
        label: '',
        value: initialValue,
        setDefaultValue: vi.fn(),
        validate: vi.fn(),
        isValid: vi.fn(),
        getError: vi.fn<() => FormElementValidationError | undefined>(),
        disable: vi.fn(),
        enable: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies FormElement;
}

export function markFormElementValid(element: ReturnType<typeof createFormElementMock>)
{
    element.isValid.mockReturnValue(true);
}

export function markFormElementInvalid(element: ReturnType<typeof createFormElementMock>, validationError: FormElementValidationError)
{
    element.isValid.mockReturnValue(false);
    element.getError.mockReturnValue(validationError);
}
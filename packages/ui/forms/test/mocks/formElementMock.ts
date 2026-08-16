import { vi } from 'vitest';
import type { FormElementValidationError } from '../../src/entities/formElementValidationError';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import { InputType } from '@client/ui-uikit';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';

export function createFormElementMock(name: string, initialValue: string)
{
    return {
        name,
        value: initialValue,

        state: createObservableViewmodelStateMock({
            name,
            value: initialValue,
            inputType: InputType.inputText,
            hasAutofocus: false,
            hasError: false,
            isDisabled: false,
        }),

        setData: vi.fn(),
        setDefaultValue: vi.fn(),
        validate: vi.fn(),
        isValid: vi.fn(),
        getError: vi.fn<() => FormElementValidationError | undefined>(),
        disable: vi.fn(),
        enable: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies FormElementViewmodel<InputType.inputText>;
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
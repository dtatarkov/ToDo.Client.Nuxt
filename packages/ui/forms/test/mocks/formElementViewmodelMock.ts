import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import { vi } from 'vitest';
import { InputType } from '@client/ui-uikit';
import type { FormElementDataForType } from '../../src/types/formElementDataForType';
import type { FormElementStateForType } from '../../src/types/formElementStateForType';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';

export function createFormElementViewmodelMock(
    name: string,
    data: Omit<FormElementDataForType<InputType.inputText>, 'inputType'>
)
{
    const value = data.value ?? '';

    const mock = {
        name,
        value,

        state: createObservableViewmodelStateMock<FormElementStateForType<InputType.inputText>>({
            hasAutofocus: false,
            isDisabled: false,

            ...data,

            inputType: InputType.inputText,
            name,
            hasError: false,
            value,
        }),

        disable: vi.fn(),
        enable: vi.fn(),
        setData: vi.fn(),
        setDefaultValue: vi.fn(),
        validate: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    };

    const vmMock = mock satisfies FormElementViewmodel<InputType.inputText>;

    return vmMock;
}
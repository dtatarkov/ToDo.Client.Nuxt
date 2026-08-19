import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import { vi } from 'vitest';
import { InputType } from '@client/ui-uikit';
import type { FormElementDataForType } from '../../src/types/formElementDataForType';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';

export function createFormElementViewmodelMock(
    name: string,
    data: Partial<Omit<FormElementDataForType<InputType.inputText>, 'inputType'>>
)
{
    const value = data.value ?? '';

    const mock = {
        name,
        value,
        inputType: InputType.inputText,

        state: createObservableViewmodelStateMock<FormElementDataForType<InputType.inputText>>({
            id: '',
            hasAutofocus: false,
            isDisabled: false,
            inputType: InputType.inputText,

            ...data,

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
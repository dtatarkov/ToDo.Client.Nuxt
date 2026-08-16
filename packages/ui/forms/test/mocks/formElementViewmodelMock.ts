import { ObservableViewmodelStateBase } from '@client/ui-core';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import type { FormElementValidationError } from '../../src/entities/formElementValidationError';
import { vi } from 'vitest';
import type { FormElementData } from '../../src/types/formElementData';
import type { InputType } from '@client/ui-uikit';
import type { FormElementDataForType } from '../../src/types/formElementDataForType';
import type { FormElementStateForType } from '../../src/types/formElementStateForType';
import type { FormElementValue } from '../../src/types/formElementValue';

export function createFormElementViewmodelMock(
    name: string,
    data: FormElementDataForType<InputType.inputText>
)
{
    const mock = {
        name,
        value: data.value as FormElementValue<InputType.inputText>,

        state: new ObservableViewmodelStateBase<FormElementData, FormElementStateForType<InputType.inputText>>({
            hasAutofocus: false,
            isDisabled: false,

            ...data,

            name,
            hasError: false,
        }),

        disable: vi.fn(),
        enable: vi.fn(),
        setData: vi.fn(),
        setDefaultValue: vi.fn(),
        validate: vi.fn(),
        isValid: vi.fn(),
        getError: vi.fn(),
        [Symbol.dispose]: vi.fn(),

        markAsValid()
        {
            this.isValid.mockReturnValue(true);
            this.state.update({ hasError: false });
        },

        markAsInvalid(error: FormElementValidationError) 
        {
            this.isValid.mockReturnValue(false);
            this.getError.mockReturnValue(error);
            this.state.update({ hasError: true });
        },
    };

    const vmMock = mock satisfies FormElementViewmodel<InputType.inputText>;

    return vmMock;
}
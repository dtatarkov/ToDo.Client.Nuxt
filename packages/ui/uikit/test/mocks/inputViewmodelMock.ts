import { vi } from 'vitest';
import { ObservableViewmodelStateBase } from '@client/ui-core';
import type { InputViewmodel } from '../../src/viewmodels/inputViewmodel';
import type { InputData } from '../../src/types/inputData';
import { InputType } from '../../src/enums/inputType';

export function createInputViewmodelMock(state: InputData<string>)
{
    const observableState = new ObservableViewmodelStateBase<InputData<string>>(state);

    return {
        state: observableState,
        inputType: InputType.inputText,
        name: state.name,
        isDisabled: state.isDisabled,
        hasError: state.hasError,
        value: state.value,
        setData: vi.fn(),
        disable: vi.fn(),
        enable: vi.fn(),
        setDefaultValue: vi.fn(),
        toErrorMode: vi.fn(),
        toDefaultMode: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies InputViewmodel<string>;
}

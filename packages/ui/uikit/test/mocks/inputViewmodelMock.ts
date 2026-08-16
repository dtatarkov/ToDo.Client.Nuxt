import { vi } from 'vitest';
import { ObservableViewmodelStateBase } from '@client/ui-core';
import type { InputViewmodel } from '../../src/viewmodels/inputViewmodel';
import type { InputData } from '../../src/types/inputData';
import type { InputState } from '../../src/types/inputState';

export function createInputViewmodelMock<V = any>(state: InputState<V, InputData<V>>)
{
    const observableState = new ObservableViewmodelStateBase<InputState<V, InputData<V>>>(state);

    return {
        state: observableState,
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
    } satisfies InputViewmodel<V>;
}

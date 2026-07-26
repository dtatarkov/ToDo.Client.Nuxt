import { vi } from 'vitest';
import type { FormViewmodelState } from '../../src/types/formViewmodelState';
import { ObservableViewmodelState } from '@client/ui-core';

export function createFormStateMock(initialState: Partial<FormViewmodelState<any>> = {}): ObservableViewmodelState<FormViewmodelState<any>>
{
    const state: FormViewmodelState<any> = {
        elements: {},
        data: {},
        errors: {},
        isDisabled: false,

        ...initialState,
    };

    return {
        value: state,
        on: vi.fn(),
        update: vi.fn(),
        toReadonly: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies ObservableViewmodelState<FormViewmodelState<any>>;
}

export const formStateMock = createFormStateMock();
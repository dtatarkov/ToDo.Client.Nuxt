import { ObservableViewmodelState } from '@client/ui-core';
import type { FormState } from '../../src/types/formState';
import type { FormElementState } from '../../src/types/formElementState';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';

export function createFormStateMock(initialState: Partial<FormState> = {}): ObservableViewmodelState<FormState>
{
    const state: FormState = {
        elements: new Array<FormElementState>(),
        isDisabled: false,

        ...initialState,
    };

    const mock = createObservableViewmodelStateMock(state);

    return mock;
}

export const formStateMock = createFormStateMock();
import { ObservableViewmodelState } from '@client/ui-core';
import type { FormDataFull } from '../../src/types/formDataFull';
import type { FormElementData } from '../../src/types/formElementData';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';

export function createFormDataMock(initialData: Partial<FormDataFull> = {}): ObservableViewmodelState<FormDataFull>
{
    const data: FormDataFull = {
        elements: new Array<FormElementData>(),
        isDisabled: false,

        ...initialData,
    };

    const mock = createObservableViewmodelStateMock(data);

    return mock;
}

export const formDataMock = createFormDataMock();
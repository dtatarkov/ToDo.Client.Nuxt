import { ObservableViewmodelState } from '@client/ui-core';
import type { FormData } from '../../src/types/formData';
import type { FormElementData } from '../../src/types/formElementData';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';

export function createFormDataMock(initialData: Partial<FormData> = {}): ObservableViewmodelState<FormData>
{
    const data: FormData = {
        elements: new Array<FormElementData>(),
        isDisabled: false,

        ...initialData,
    };

    const mock = createObservableViewmodelStateMock(data);

    return mock;
}

export const formDataMock = createFormDataMock();
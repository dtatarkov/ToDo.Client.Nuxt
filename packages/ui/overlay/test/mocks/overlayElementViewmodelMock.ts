import { vi } from 'vitest';
import type { OverlayElementViewmodel } from '../../src/viewmodels/overlayElementViewmodel';
import { createObservableViewmodelStateMock, createViewmodelMock } from '@client/ui-core/mocks';
import type { OverlayElementData } from '../../src/types/overlayElementData';
import { OverlayElementType, type OverlayElementsData } from '../../src';

export function createOverlayElementViewmodelMock()
{
    return {
        state: createObservableViewmodelStateMock<OverlayElementsData>({
            elementType: OverlayElementType.modal,
            title: '',
            description: '',
            content: createViewmodelMock({}),
            buttonConfirm: undefined,
            buttonCancel: undefined,
            isDisabled: false,
        }),

        close: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies OverlayElementViewmodel<OverlayElementData>;
}

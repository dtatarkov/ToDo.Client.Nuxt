import { vi } from 'vitest';
import type { OverlayElementViewmodel } from '../../src/viewmodels/overlayElementViewmodel';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';
import type { OverlayElementData } from '../../src/types/overlayElementData';
import { OverlayElementType } from '../../src';

export function createOverlayElementViewmodelMock<TData extends Record<string, any> = Record<string, any>>(
    data: TData = {} as TData
)
{
    return {
        state: createObservableViewmodelStateMock<OverlayElementData<TData>>({
            elementType: OverlayElementType.modal,
            ...data
        }),

        close: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies OverlayElementViewmodel<TData>;
}

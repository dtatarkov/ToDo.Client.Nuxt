import { vi } from 'vitest';
import type { ModalViewmodel } from '../../src/viewmodels/modalViewmodel';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';
import { OverlayElementType, type ModalDataFull } from '../../src';

export function createModalViewmodelMock<TContentData extends Record<string, any>>(state: ModalDataFull<TContentData>)
{
    return {
        state: createObservableViewmodelStateMock({
            elementType: OverlayElementType.modal,
            ...state
        }),
        enable: vi.fn(),
        disable: vi.fn(),
        close: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies ModalViewmodel<TContentData>;
}
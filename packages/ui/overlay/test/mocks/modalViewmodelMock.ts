import { vi } from 'vitest';
import type { ModalViewmodel } from '../../src/viewmodels/modalViewmodel';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';
import type { ModalData } from '../../src/types/modalData';

export function createModalViewmodelMock<TContentData extends Record<string, any>>(state: ModalData<TContentData>)
{
    return {
        state: createObservableViewmodelStateMock(state),
        enable: vi.fn(),
        disable: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies ModalViewmodel<TContentData>;
}
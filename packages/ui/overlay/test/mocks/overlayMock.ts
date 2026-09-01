import { vi } from 'vitest';
import type { Overlay } from '../../src/entities/overlay';
import type { OverlayElementViewmodel } from '../../src/viewmodels/overlayElementViewmodel';
import type { OverlayElementsData } from '../../src/types/overlayElementsData';
import { createObservableReadonlyMock } from '@client/shared/mocks';

export const overlayMock = {
    elements: createObservableReadonlyMock(new Array<OverlayElementViewmodel<OverlayElementsData>>()),
    createModal: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Overlay;

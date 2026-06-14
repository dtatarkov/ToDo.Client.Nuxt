import { vi } from 'vitest';
import type { Overlay } from '../entities/overlay';

export const overlayMock = {
    getElements: vi.fn(),
    createModal: vi.fn(),
    removeElement: vi.fn(),
    onElementsChange: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Overlay;
import { vi } from 'vitest';
import type { Overlay } from '../entities/overlay';

export const overlayMock = {
    getElements: vi.fn(),
    createModal: vi.fn(),
    addElement: vi.fn(),
    removeElement: vi.fn(),
} satisfies Overlay;
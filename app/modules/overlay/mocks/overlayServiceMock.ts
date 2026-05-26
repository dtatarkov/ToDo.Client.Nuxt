import { vi } from 'vitest';
import type { OverlayService } from '../interfaces/overlayService';

export const overlayServiceMock = {
    createModalBase: vi.fn(),
    createModalAddForm: vi.fn(),
    createEditFormModal: vi.fn(),
    getElements: vi.fn()
} satisfies OverlayService;
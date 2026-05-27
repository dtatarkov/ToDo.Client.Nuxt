import { vi } from 'vitest';
import type { OverlayService } from '../services/overlayService';

export const overlayServiceMock = {
    createModalBase: vi.fn(),
    addModalConfirmForm: vi.fn(),
    getElements: vi.fn()
} satisfies OverlayService;
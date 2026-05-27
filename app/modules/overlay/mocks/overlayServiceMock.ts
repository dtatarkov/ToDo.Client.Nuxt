import { vi } from 'vitest';
import type { OverlayService } from '../services/overlayService';

export const overlayServiceMock = {
    addModalConfirmForm: vi.fn(),
    getElements: vi.fn()
} satisfies OverlayService;
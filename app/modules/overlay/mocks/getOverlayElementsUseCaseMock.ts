import { vi } from 'vitest';
import type { GetOverlayElementsUseCase } from '../usecases/getOverlayElementsUseCase';

export const getOverlayElementsUseCaseMock = {
    execute: vi.fn()
} satisfies GetOverlayElementsUseCase;
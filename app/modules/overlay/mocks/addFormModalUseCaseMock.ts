import { vi } from 'vitest';
import type { AddFormModalUseCase } from '../usecases/addFormModalUseCase';

export const addFormModalUseCaseMock = {
    execute: vi.fn()
} satisfies AddFormModalUseCase;
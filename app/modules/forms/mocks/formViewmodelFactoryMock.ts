import { vi } from 'vitest';
import type { FormViewmodelFactory } from '../interfaces/formViewmodelFactory';

export const formViewmodelFactoryMock = {
    create: vi.fn()
} satisfies FormViewmodelFactory;
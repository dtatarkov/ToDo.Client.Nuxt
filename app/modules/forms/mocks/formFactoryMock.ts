import { vi } from 'vitest';
import type { FormFactory } from '../factories/formFactory';

export const formFactoryMock = {
    create: vi.fn()
} satisfies FormFactory;
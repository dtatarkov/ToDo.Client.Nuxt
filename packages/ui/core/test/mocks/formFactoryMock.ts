import { vi } from 'vitest';
import type { FormFactory } from '../../src/factories/formFactory';

export const formFactoryMock = {
    create: vi.fn()
} satisfies FormFactory;
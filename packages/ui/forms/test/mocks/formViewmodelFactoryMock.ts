import { vi } from 'vitest';
import type { FormViewmodelFactory } from '../../src/factories/formViewmodelFactory';

export const formViewmodelFactoryMock = {
    create: vi.fn(),
} satisfies FormViewmodelFactory;

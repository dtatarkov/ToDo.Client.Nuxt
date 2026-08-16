import { vi } from 'vitest';
import type { FormElementViewmodelsFactory } from '../../src/factories/formElementViewmodelsFactory';

export const formElementViewmodelsFactoryMock = {
    createViewmodels: vi.fn(),
} satisfies FormElementViewmodelsFactory;



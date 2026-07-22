import { vi } from 'vitest';
import type { FormElementsFactory } from '../../src/factories/formElementsFactory';

export const formElementsFactoryMock = {
    createElements: vi.fn(),
} satisfies FormElementsFactory;
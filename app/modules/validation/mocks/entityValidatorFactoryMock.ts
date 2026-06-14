import { vi } from 'vitest';
import type { EntityValidatorFactory } from '../factories/entityValidatorFactory';

export const entityValidatorFactoryMock = {
    getValidator: vi.fn(),
} satisfies EntityValidatorFactory;
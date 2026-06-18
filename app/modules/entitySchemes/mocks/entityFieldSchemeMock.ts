import { vi } from 'vitest';
import type { EntityFieldScheme } from '../entities/entityFieldScheme';

export const entityFieldSchemeMock = {
    validate: vi.fn(),
    getFormElementData: vi.fn(),
} satisfies EntityFieldScheme;
import { vi } from 'vitest';
import type { EntityFieldScheme } from '../entities/EntityFieldScheme';

export const entityFieldSchemeMock = {
    validate: vi.fn(),
} satisfies EntityFieldScheme;
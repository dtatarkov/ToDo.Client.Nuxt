import { vi } from 'vitest';
import type { EntityScheme } from '../../src/entities/entityScheme';

export const entitySchemeMock = {
    validate: vi.fn(),
    parse: vi.fn(),
    extend: vi.fn(),
    fields: {},
} satisfies EntityScheme<any, any>;

import { vi } from 'vitest';
import type { DateParser } from '../services/dateParser';

export const dateParserMock = {
    fromString: vi.fn(),
    fromStringOptional: vi.fn(),
} satisfies DateParser;
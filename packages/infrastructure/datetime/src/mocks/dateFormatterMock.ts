import type { DateFormatter } from '../services/dateFormatter';
import { vi } from 'vitest';

export const dateFormatterMock = {
    formatDateOptional: vi.fn(),
    formatDate: vi.fn(),
} satisfies DateFormatter;

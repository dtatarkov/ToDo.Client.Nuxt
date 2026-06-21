import { vi } from 'vitest';
import type { Notifier } from '../entities/notifier';

export const notifierMock = {
    notify: vi.fn(),
} satisfies Notifier;
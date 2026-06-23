import { vi } from 'vitest';
import type { AppNotificationsStore } from '../entities/appNotificationsStore';

export const appNotificationsStoreMock = {
    addNotification: vi.fn(),
    getNotifications: vi.fn(),
    onNotificationAdded: vi.fn(),
    createTimeline: vi.fn(),

    [Symbol.dispose]: vi.fn(),
} satisfies AppNotificationsStore;
import { vi } from 'vitest';
import type { AppNotificationsStore } from '../entities/appNotificationsStore';

export const appNotificationsStoreMock = createAppNotificationsStoreMock(false);

export function createAppNotificationsStoreMock(isEmpty: boolean)
{
    return {
        isEmpty,
        addNotification: vi.fn(),
        getNotifications: vi.fn(),
        onNotificationsChange: vi.fn(),
        onEmptyStateChange: vi.fn(),
        createTimeline: vi.fn(),

        [Symbol.dispose]: vi.fn(),
    } satisfies AppNotificationsStore;
}
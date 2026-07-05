import { vi } from 'vitest';
import type { AppNotificationsStore } from '../entities/appNotificationsStore';
import { createObservableReadonlyMock } from '@packages/shared';

export const appNotificationsStoreMock = createAppNotificationsStoreMock(false);

export function createAppNotificationsStoreMock(isEmpty: boolean)
{
    return {
        hasNotifications: createObservableReadonlyMock(isEmpty),
        notifications: createObservableReadonlyMock<readonly []>([]),
        addNotification: vi.fn(),
        createTimeline: vi.fn(),

        [Symbol.dispose]: vi.fn(),
    } satisfies AppNotificationsStore;
}
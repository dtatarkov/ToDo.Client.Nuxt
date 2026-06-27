import { vi } from 'vitest';
import type { AppNotificationsStore } from '../entities/appNotificationsStore';
import { createObservableReadonlyMock } from '@/modules/shared/mocks/observableReadonlyMock';

export const appNotificationsStoreMock = createAppNotificationsStoreMock(false);

export function createAppNotificationsStoreMock(isEmpty: boolean)
{
    return {
        isEmpty: createObservableReadonlyMock(isEmpty),
        addNotification: vi.fn(),
        getNotifications: vi.fn(),
        onNotificationsChange: vi.fn(),
        createTimeline: vi.fn(),

        [Symbol.dispose]: vi.fn(),
    } satisfies AppNotificationsStore;
}
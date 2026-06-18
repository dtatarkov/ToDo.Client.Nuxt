import { vi } from 'vitest';
import type { Notification, NotificationData } from '../entities/notification';


export function createNotificationMock(data: Partial<NotificationData> = {}): Notification
{
    const defaultData: NotificationData = {
        id: '',
        title: '',
        description: '',
        icon: 'info',
        color: 'neutral',
    };

    return {
        ...defaultData,
        ...data,

        key: '',
        close: vi.fn(),
        vnode: {} as VNode,
        [Symbol.dispose]: vi.fn(),
    } satisfies Notification;
}

export const notificationMock = createNotificationMock();
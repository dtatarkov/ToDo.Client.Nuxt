import { vi } from 'vitest';
import type { Notification, NotificationData } from '../entities/notification';
import { Icon } from '@/modules/shared/enums/icons';


export function createNotificationMock(data: Partial<NotificationData> = {}): Notification
{
    const defaultData: NotificationData = {
        id: '',
        title: '',
        description: '',
        icon: Icon.questionMarkCircle,
        color: 'neutral',
    };

    return {
        ...defaultData,
        ...data,

        key: '',
        close: vi.fn(),
        vnode: {} as VNode,
        getData: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies Notification;
}

export const notificationMock = createNotificationMock();
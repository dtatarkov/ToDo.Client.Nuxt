import { vi } from 'vitest';
import type { AppRootNotification } from '../entities/appRootNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from '../entities/appNotification';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../types/notificationType';

export function createAppRootNotificationMock(
    data: AppNotificationData,
    children: readonly AppNotification[] = [],
): AppRootNotification
{
    return {
        ...data,
        children,
        addNotification: vi.fn(),
        getColor: vi.fn(),
        showToast: vi.fn(),
    } satisfies AppRootNotification;
}

export const appRootNotificationMock = createAppRootNotificationMock({
    date: new Date(),
    title: 'Test Root Notification',
    description: 'Test Root Notification Description',
    icon: Icon.bellInactive,
    type: NotificationType.Error,
    groupId: 'group-1',
});

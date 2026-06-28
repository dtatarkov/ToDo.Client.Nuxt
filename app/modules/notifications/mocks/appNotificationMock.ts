import { vi } from 'vitest';
import type { AppNotification } from '../entities/appNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../types/notificationType';

export function createAppNotificationMock(data: AppNotificationData)
{
    return {
        ...data,

        getColor: vi.fn(),
        showToast: vi.fn()
    } satisfies AppNotification;
}

export const appNotificationMock = createAppNotificationMock({
    date: new Date(),
    title: 'Test',
    description: 'Description',
    icon: Icon.bellInactive,
    type: NotificationType.Error,
});
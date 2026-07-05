import type { Icon } from '@packages/shared';
import type { NotificationType } from './notificationType';

export type AppNotificationData = {
    groupId?: string;
    date: Date;
    title: string;
    description: string;
    icon: Icon;
    type: NotificationType;
};
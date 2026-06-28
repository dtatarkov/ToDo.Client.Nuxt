import type { Icon } from '@/modules/shared/enums/icons';
import type { NotificationType } from './notificationType';

export type AppNotificationData = {
    groupId?: string;
    date: Date;
    title: string;
    description: string;
    icon: Icon;
    type: NotificationType;
};
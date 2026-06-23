import type { Icon } from '@/modules/shared/enums/icons';

export type AppNotificationData = {
    groupId?: string;
    date: Date;
    title: string;
    description: string;
    icon: Icon;
};
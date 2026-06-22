import type { Icon } from '@/modules/shared/enums/icons';

export type NotificationData = {
    date: Date;
    title: string;
    description: string;
    icon: Icon;
};
import type { Color } from '@/modules/uikit/types/color';

export type NotificationData = {
    id?: string;
    title: string;
    description: string;
    icon: string;
    color: Color;
};
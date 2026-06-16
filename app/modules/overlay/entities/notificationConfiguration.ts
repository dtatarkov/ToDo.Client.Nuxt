import type { Color } from '@/modules/uikit/types/color';

export type NotificationConfiguration = {
    id?: string;
    title: string;
    description: string;
    icon: string;
    color?: Color;
};
import type { Color } from '@/modules/uikit/types/color';

export type NotificationConfiguration = {
    title: string;
    description: string;
    icon: string;
    color?: Color;
};
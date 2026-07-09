import type { Color } from '@/modules/uikit/types/color';
import type { Icon } from '@client/shared';

export type ToastConfiguration = {
    id?: string;
    title: string;
    description: string;
    icon: Icon;
    color?: Color;
};
import type { Color } from '@/modules/uikit/types/color';
import type { Icon } from '@/modules/shared/enums/icons';

export type ToastConfiguration = {
    id?: string;
    title: string;
    description: string;
    icon: Icon;
    color?: Color;
};
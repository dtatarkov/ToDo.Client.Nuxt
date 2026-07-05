import type { Color } from '@/modules/uikit/types/color';
import type { Icon } from '@packages/shared';

export type ToastData = {
    id?: string;
    title: string;
    description: string;
    icon: Icon;
    color: Color;
};
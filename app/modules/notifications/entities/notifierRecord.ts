import type { Icon } from '@/modules/shared/enums/icons';
import type { Color } from '@/modules/uikit/types/color';

export type NotifierRecord = {
    id?: string;
    date: Date;
    title: string;
    description: string;
    icon: Icon;
    color?: Color;
};
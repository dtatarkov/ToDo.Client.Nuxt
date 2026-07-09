import type { Color } from '@/modules/uikit/types/color';
import type { Icon } from '@client/shared';

export type NotifierRecord = {
    id?: string;
    date: Date;
    title: string;
    description: string;
    icon: Icon;
    color?: Color;
};
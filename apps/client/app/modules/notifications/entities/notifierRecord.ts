import type { Color } from '@client/ui-core';
import type { Icon } from '@client/shared';

export type NotifierRecord = {
    id?: string;
    date: Date;
    title: string;
    description: string;
    icon: Icon;
    color?: Color;
};
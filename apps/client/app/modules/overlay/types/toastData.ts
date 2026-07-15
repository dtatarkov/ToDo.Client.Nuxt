import type { Color } from '@client/ui-core';
import type { Icon } from '@client/shared';

export type ToastData = {
    id?: string;
    title: string;
    description: string;
    icon: Icon;
    color: Color;
};
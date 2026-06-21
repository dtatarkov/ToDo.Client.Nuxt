import type { Icon } from '@/modules/shared/enums/icons';

export type TimelineRecord = {
    date: Date,
    title: string,
    description: string,
    icon: Icon,
};
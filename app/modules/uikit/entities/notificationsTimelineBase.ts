import type { NotificationsTimeline } from './notificationsTimeline';
import { TimelineBase } from './timelineBase';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export class NotificationsTimelineBase extends TimelineBase implements NotificationsTimeline
{
    override readonly key = getUniqueId('notifications-timeline');
}


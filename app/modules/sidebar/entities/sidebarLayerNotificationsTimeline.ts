import type { Timeline } from '@/modules/notifications/entities/timeline';
import { SidebarLayerBase } from './sidebarLayerBase';

export class SidebarLayerNotificationsTimeline extends SidebarLayerBase<Timeline>
{
    constructor(
        timeline: Timeline,
    )
    {
        super(timeline);

        timeline.onNotificationsChange(() =>
        {
            this.availabilityChangeEvent.emit(this.isAvailable());
        });
    }

    isAvailable(): boolean
    {
        return this.content.hasNotifications();
    }
}
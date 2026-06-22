import { SidebarLayerBase } from './sidebarLayerBase';
import type { NotificationsTimeline } from '@/modules/uikit/entities/notificationsTimeline';

export class SidebarLayerNotificationsTimeline extends SidebarLayerBase<NotificationsTimeline>
{
    constructor(
        notificationsTimeline: NotificationsTimeline,
    )
    {
        super(notificationsTimeline);

        notificationsTimeline.onRecordsChange(() =>
        {
            this.availabilityChangeEvent.emit(this.isAvailable());
        });
    }

    isAvailable(): boolean
    {
        return this.content.hasRecords();
    }
}
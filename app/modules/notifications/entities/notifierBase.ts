import { dependency } from '@/modules/shared/decorators/dependency';
import { Notifier } from './notifier';
import type { NotifierRecord } from './notifierRecord';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { NotificationsTimeline } from '@/modules/uikit/entities/notificationsTimeline';

@dependency(Overlay)
@dependency(NotificationsTimeline)
export class NotifierBase extends Notifier
{
    constructor(
        private overlay: Overlay,
        private notificationsTimeline: NotificationsTimeline,
    )
    {
        super();
    }

    override notify(record: NotifierRecord): void
    {
        this.overlay.createToast({
            id: record.id,
            title: record.title,
            description: record.description,
            icon: record.icon,
            color: record.color,
        });

        this.notificationsTimeline.addRecord({
            date: record.date,
            title: record.title,
            description: record.description,
            icon: record.icon,
        });
    }
}
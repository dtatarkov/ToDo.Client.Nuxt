import { dependency } from '@/modules/shared/decorators/dependency';
import { AppNotificationsStore } from './appNotificationsStore';
import { AppNotificationBase } from './appNotificationBase';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { TimelineBase } from './timelineBase';
import type { Timeline } from './timeline';
import { ObservableArrayBase } from '@/modules/shared/entities/observableArrayBase';
import { ObservableWritableBase } from '@/modules/shared/entities/observableWritableBase';

@dependency(Overlay)
export class AppNotificationsStoreBase extends AppNotificationsStore
{
    private disposeToken = new DisposeToken();

    readonly hasNotifications = new ObservableWritableBase<boolean>(false);

    constructor(private overlay: Overlay)
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.notifications[Symbol.dispose]();
            this.hasNotifications[Symbol.dispose]();
        });
    }

    readonly notifications = new ObservableArrayBase<AppNotification>();

    override addNotification(data: AppNotificationData): AppNotification
    {
        this.disposeToken.assertNotDisposed();

        const notification = new AppNotificationBase(this.overlay, data);
        this.notifications.add(notification);

        if (this.notifications.value.length === 1)
        {
            this.hasNotifications.value = true;
        }

        notification.showToast();

        return notification;
    }

    override createTimeline(): Timeline
    {
        const timeline = new TimelineBase(this);

        return timeline;
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
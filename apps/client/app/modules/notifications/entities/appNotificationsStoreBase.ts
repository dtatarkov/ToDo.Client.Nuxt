import { dependency } from '@client/di';
import { AppNotificationsStore } from './appNotificationsStore';
import { AppRootNotificationBase } from './appRootNotificationBase';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { AppRootNotification } from './appRootNotification';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { TimelineBase } from './timelineBase';
import type { Timeline } from './timeline';
import { DisposeToken, ObservableArrayBase, ObservableWritableBase } from '@client/shared';

@dependency(Overlay)
export class AppNotificationsStoreBase extends AppNotificationsStore
{
    private disposeToken = new DisposeToken();

    readonly notifications = new ObservableArrayBase<AppRootNotification>();
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

    override addNotification(data: AppNotificationData): AppNotification
    {
        this.disposeToken.assertNotDisposed();

        let notification = this.tryAddNotificationToLastRoot(data);

        if (!notification)
        {
            notification = this.addRootNotification(data);
        }

        if (this.notifications.value.length === 1)
        {
            this.hasNotifications.value = true;
        }

        notification.showToast();

        return notification;
    }

    private addRootNotification(data: AppNotificationData): AppRootNotification
    {
        const rootNotification = new AppRootNotificationBase(this.overlay, data);
        this.notifications.add(rootNotification);

        return rootNotification;
    }

    private tryAddNotificationToLastRoot(data: AppNotificationData): AppNotification | undefined
    {
        const lastRoot = this.notifications.value[this.notifications.value.length - 1];

        if (lastRoot)
        {
            const result = lastRoot.addNotification(data);

            if (result !== false)
            {
                return result;
            }
        }

        return undefined;
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

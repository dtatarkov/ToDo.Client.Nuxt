import { dependency } from '@/modules/shared/decorators/dependency';
import { AppNotificationsStore } from './appNotificationsStore';
import { AppNotificationBase } from './appNotificationBase';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { TimelineBase } from './timelineBase';
import type { Timeline } from './timeline';

@dependency(Overlay)
export class AppNotificationsStoreBase extends AppNotificationsStore
{
    private disposeToken = new DisposeToken();
    private notifications = new Array<AppNotification>();
    private notificationAddedEvent = new EntityEvent<AppNotification>();

    constructor(private overlay: Overlay)
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.notificationAddedEvent[Symbol.dispose]();
        });
    }

    addNotification(data: AppNotificationData): void
    {
        this.disposeToken.assertNotDisposed();

        const notification = new AppNotificationBase(this.overlay, data);
        this.notifications.push(notification);
        this.notificationAddedEvent.emit(notification);
    }

    getNotifications(): AppNotification[]
    {
        this.disposeToken.assertNotDisposed();

        return this.notifications;
    }

    createTimeline(disposeToken: DisposeToken): Timeline
    {
        const timeline = new TimelineBase(this.notifications);

        this.onNotificationAdded(notification =>
        {
            timeline.addNotification(notification);
        }, disposeToken);

        return timeline;
    }

    onNotificationAdded(callback: Action<[AppNotification]>, disposeToken?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.notificationAddedEvent.on(callback, disposeToken);
    }

    [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
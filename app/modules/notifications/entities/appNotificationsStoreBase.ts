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
    private notificationsChangeEvent = new EntityEvent<AppNotification[]>();
    private emptyStateChangeEvent = new EntityEvent<boolean>();

    constructor(private overlay: Overlay)
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.notificationsChangeEvent[Symbol.dispose]();
            this.emptyStateChangeEvent[Symbol.dispose]();
        });
    }

    get isEmpty()
    {
        return this.notifications.length === 0;
    }

    override addNotification(data: AppNotificationData): void
    {
        this.disposeToken.assertNotDisposed();

        const notification = new AppNotificationBase(this.overlay, data);
        this.notifications.push(notification);
        this.notificationsChangeEvent.emit(this.notifications);

        if (this.notifications.length === 1)
        {
            this.emptyStateChangeEvent.emit(false);
        }

        notification.showToast();
    }

    override getNotifications(): AppNotification[]
    {
        this.disposeToken.assertNotDisposed();

        return this.notifications;
    }

    override createTimeline(): Timeline
    {
        const timeline = new TimelineBase(this);

        return timeline;
    }

    override onNotificationsChange(handler: Action<[notifications: AppNotification[]]>, disposeToken?: DisposeToken): void
    {
        this.notificationsChangeEvent.on(handler, disposeToken);
    }

    override onEmptyStateChange(handler: Action<[isEmpty: boolean]>, disposeToken?: DisposeToken): void
    {
        this.emptyStateChangeEvent.on(handler, disposeToken);
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
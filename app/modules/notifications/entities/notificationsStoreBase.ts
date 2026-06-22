import { dependency } from '@/modules/shared/decorators/dependency';
import { NotificationsStore } from './notificationsStore';
import { NotificationBase } from './notificationBase';
import type { NotificationData } from '../types/notificationData';
import type { Notification } from './notification';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import { Overlay } from '@/modules/overlay/entities/overlay';

@dependency(Overlay)
export class NotificationsStoreBase extends NotificationsStore
{
    private disposeToken = new DisposeToken();
    private notifications = new Array<Notification>();
    private notificationAddedEvent = new EntityEvent<Notification>();

    constructor(private overlay: Overlay)
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.notificationAddedEvent[Symbol.dispose]();
        });
    }

    addNotification(data: NotificationData): void
    {
        this.disposeToken.assertNotDisposed();

        const notification = new NotificationBase(this.overlay, data);
        this.notifications.push(notification);
        this.notificationAddedEvent.emit(notification);
    }

    getNotifications(): Notification[]
    {
        this.disposeToken.assertNotDisposed();

        return this.notifications;
    }

    onNotificationAdded(callback: Action<[Notification]>, disposeToken?: DisposeToken): void
    {
        this.disposeToken.assertNotDisposed();
        this.notificationAddedEvent.on(callback, disposeToken);
    }

    [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
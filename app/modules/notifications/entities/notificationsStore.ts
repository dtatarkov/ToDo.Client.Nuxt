import type { NotificationData } from '../types/notificationData';
import type { Notification } from './notification';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';

export abstract class NotificationsStore implements Disposable
{
    abstract addNotification(data: NotificationData): void;
    abstract getNotifications(): Notification[];
    abstract onNotificationAdded(callback: Action<[Notification]>, disposeToken?: DisposeToken): void;

    abstract [Symbol.dispose](): void;
}
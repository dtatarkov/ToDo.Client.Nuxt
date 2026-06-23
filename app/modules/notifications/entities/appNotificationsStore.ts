import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import type { Timeline } from './timeline';

export abstract class AppNotificationsStore implements Disposable
{
    abstract addNotification(data: AppNotificationData): void;
    abstract getNotifications(): AppNotification[];
    abstract onNotificationAdded(callback: Action<[AppNotification]>, disposeToken?: DisposeToken): void;

    abstract createTimeline(disposeToken: DisposeToken): Timeline;

    abstract [Symbol.dispose](): void;
}
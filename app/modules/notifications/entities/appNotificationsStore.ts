import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import type { Timeline } from './timeline';
import type { Emptyable } from '@/modules/shared/interfaces/emptyable';

export abstract class AppNotificationsStore implements Disposable, Emptyable
{
    abstract readonly isEmpty: boolean;

    abstract addNotification(data: AppNotificationData): void;
    abstract getNotifications(): AppNotification[];
    abstract onNotificationsChange(callback: Action<[notifications: AppNotification[]]>, disposeToken?: DisposeToken): void;
    abstract onEmptyStateChange(handler: Action<[isEmpty: boolean]>, diposeToken?: DisposeToken): void;

    abstract createTimeline(): Timeline;

    abstract [Symbol.dispose](): void;
}
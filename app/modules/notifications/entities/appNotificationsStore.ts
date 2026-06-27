import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import type { Timeline } from './timeline';
import type { Emptyable } from '@/modules/shared/interfaces/emptyable';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';

export abstract class AppNotificationsStore implements Disposable, Emptyable
{
    abstract isEmpty: ObservableReadonly<boolean>;

    abstract addNotification(data: AppNotificationData): void;
    abstract getNotifications(): AppNotification[];
    abstract onNotificationsChange(callback: Action<[notifications: AppNotification[]]>, disposeToken?: DisposeToken): void;

    abstract createTimeline(): Timeline;

    abstract [Symbol.dispose](): void;
}
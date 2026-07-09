import type { ObservableReadonly } from '@client/shared';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { AppRootNotification } from './appRootNotification';
import type { Timeline } from './timeline';

export abstract class AppNotificationsStore implements Disposable
{
    abstract readonly notifications: ObservableReadonly<readonly AppRootNotification[]>;
    abstract readonly hasNotifications: ObservableReadonly<boolean>;

    abstract addNotification(data: AppNotificationData): AppNotification;

    abstract createTimeline(): Timeline;

    abstract [Symbol.dispose](): void;
}
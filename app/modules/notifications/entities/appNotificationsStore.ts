import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { Timeline } from './timeline';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';

export abstract class AppNotificationsStore implements Disposable
{
    abstract readonly notifications: ObservableReadonly<readonly AppNotification[]>;
    abstract readonly hasNotifications: ObservableReadonly<boolean>;

    abstract addNotification(data: AppNotificationData): void;

    abstract createTimeline(): Timeline;

    abstract [Symbol.dispose](): void;
}
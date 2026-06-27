import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { Timeline } from './timeline';
import type { Emptyable } from '@/modules/shared/interfaces/emptyable';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';

export abstract class AppNotificationsStore implements Disposable, Emptyable
{
    abstract readonly notifications: ObservableReadonly<readonly AppNotification[]>;
    abstract readonly isEmpty: ObservableReadonly<boolean>;

    abstract addNotification(data: AppNotificationData): void;

    abstract createTimeline(): Timeline;

    abstract [Symbol.dispose](): void;
}
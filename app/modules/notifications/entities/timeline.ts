import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { AppNotification } from './appNotification';

export abstract class Timeline extends UIElement
{
    abstract addNotification(notification: AppNotification): void;
    abstract getNotifications(): AppNotification[];
    abstract hasNotifications(): boolean;
    abstract onNotificationsChange(callback: Action<[]>, disposeToken?: DisposeToken): void;
}
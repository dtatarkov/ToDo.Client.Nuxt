import { h } from 'vue';
import { Timeline } from './timeline';
import VTimeline from '../components/VTimeline.vue';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { AppNotification } from './appNotification';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export class TimelineBase extends Timeline
{
    private notifications;
    private notificationsChangeEvent = new EntityEvent();

    readonly key = getUniqueId('timeline');

    constructor(
        notifications: Array<AppNotification> = []
    )
    {
        super();

        this.notifications = [...notifications];
    }

    override addNotification(notification: AppNotification): void
    {
        this.notifications.push(notification);
        this.notificationsChangeEvent.emit();
    }

    override getNotifications(): AppNotification[]
    {
        return this.notifications;
    }

    override hasNotifications(): boolean
    {
        return this.notifications.length > 0;
    }

    override onNotificationsChange(callback: Action<[]>, disposeToken?: DisposeToken): void
    {
        this.notificationsChangeEvent.on(callback, disposeToken);
    }

    override get vnode()
    {
        return h(VTimeline, { notifications: this.notifications });
    }

    override[Symbol.dispose](): void
    {
        this.notificationsChangeEvent[Symbol.dispose]();
    }
}
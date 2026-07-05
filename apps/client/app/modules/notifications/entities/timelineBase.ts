import { h } from 'vue';
import { Timeline } from './timeline';
import VTimeline from '../components/VTimeline.vue';
import { DisposeToken, getUniqueId  } from '@packages/shared';

import type { AppNotificationsStore } from './appNotificationsStore';
import type { TimelineData } from '../types/timelineData';

export class TimelineBase extends Timeline
{
    private disposeToken = new DisposeToken();
    private data: TimelineData;

    readonly key = getUniqueId('timeline');

    constructor(
        notificationStore: AppNotificationsStore
    )
    {
        super();

        this.data = shallowReactive({
            notifications: notificationStore.notifications.value,
        });

        notificationStore.notifications.on(notifications =>
        {
            this.data.notifications = [...notifications];
        }, this.disposeToken);
    }

    override get vnode()
    {
        return h(VTimeline, this.data);
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
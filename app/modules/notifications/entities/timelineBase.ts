import { h } from 'vue';
import { Timeline } from './timeline';
import VTimeline from '../components/VTimeline.vue';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { AppNotification } from './appNotification';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { AppNotificationsStore } from './appNotificationsStore';
import { ReadonlyRefValueChangeException } from '@/modules/shared/exceptions/readonlyRefValueChangeException';

export class TimelineBase extends Timeline
{
    private disposeToken = new DisposeToken();
    private notificationsRef: Ref<AppNotification[]>;

    readonly key = getUniqueId('timeline');

    constructor(
        notificationStore: AppNotificationsStore
    )
    {
        super();

        this.notificationsRef = customRef((track, trigger) =>
        {
            notificationStore.notifications.on(() =>
            {
                trigger();
            }, this.disposeToken);

            return {
                get()
                {
                    track();
                    return [...notificationStore.notifications.value];
                },

                set()
                {
                    throw new ReadonlyRefValueChangeException();
                },
            };
        });
    }

    override get vnode()
    {
        return h(VTimeline, {
            notifications: this.notificationsRef.value
        });
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
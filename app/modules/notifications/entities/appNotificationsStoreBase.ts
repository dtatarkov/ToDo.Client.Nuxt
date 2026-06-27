import { dependency } from '@/modules/shared/decorators/dependency';
import { AppNotificationsStore } from './appNotificationsStore';
import { AppNotificationBase } from './appNotificationBase';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { TimelineBase } from './timelineBase';
import type { Timeline } from './timeline';
import { ObservableArrayBase } from '@/modules/shared/entities/observableArrayBase';
import { ObservableWritableBase } from '@/modules/shared/entities/observableWritableBase';

@dependency(Overlay)
export class AppNotificationsStoreBase extends AppNotificationsStore
{
    private disposeToken = new DisposeToken();

    readonly isEmpty = new ObservableWritableBase<boolean>(true);

    constructor(private overlay: Overlay)
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.notifications[Symbol.dispose]();
            this.isEmpty[Symbol.dispose]();
        });
    }

    readonly notifications = new ObservableArrayBase<AppNotification>();

    override addNotification(data: AppNotificationData): void
    {
        this.disposeToken.assertNotDisposed();

        const notification = new AppNotificationBase(this.overlay, data);
        this.notifications.add(notification);

        if (this.notifications.value.length === 1)
        {
            this.isEmpty.value = false;
        }

        notification.showToast();
    }

    override createTimeline(): Timeline
    {
        const timeline = new TimelineBase(this);

        return timeline;
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
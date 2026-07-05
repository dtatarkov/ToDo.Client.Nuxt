import { SidebarContentBase } from './sidebarContentBase';
import type { SidebarContentActivator } from './sidebarContentActivator';
import type { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';
import type { Timeline } from '@/modules/notifications/entities/timeline';
import type { ObservableReadonly } from '@packages/shared';

export class SidebarTimeline extends SidebarContentBase
{
    private timelineDisposeToken = this.disposeToken.createChildToken();
    private timeline: Timeline | undefined;

    canActivate: ObservableReadonly<boolean>;

    constructor(
        contentActivator: SidebarContentActivator,
        private readonly notificationsStore: AppNotificationsStore
    )
    {
        super(contentActivator);

        this.canActivate = this.notificationsStore.hasNotifications;

        this.disposeToken.onDispose(() =>
        {
            this.deactivate();
        });
    }

    protected override handleActivation(): void
    {
        this.timelineDisposeToken.reset();

        const timeline = this.notificationsStore.createTimeline();

        this.timelineDisposeToken.onDispose(() =>
        {
            timeline[Symbol.dispose]();
        });

        this.timeline = timeline;
    }

    protected override handleDeactivation(): void
    {
        this.timelineDisposeToken[Symbol.dispose]();
        this.timeline = undefined;
    }

    override get vnode(): VNode | undefined
    {
        return this.timeline?.vnode;
    }
}
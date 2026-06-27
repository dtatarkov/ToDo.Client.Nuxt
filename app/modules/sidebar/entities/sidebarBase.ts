import { dependency } from '@/modules/shared/decorators/dependency';
import { Sidebar } from './sidebar';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { SidebarContent } from './sidebarContent';
import { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';
import { SidebarTimeline } from './sidebarTimeline';
import type { SidebarContentActivator } from './sidebarContentActivator';
import { ObservableWritableBase } from '@/modules/shared/entities/observableWritableBase';

@dependency(AppNotificationsStore)
export class SidebarBase extends Sidebar implements SidebarContentActivator
{
    private disposeToken = new DisposeToken();

    readonly content = new ObservableWritableBase<SidebarContent | undefined>(undefined, { deferred: true });
    readonly timeline: SidebarContent;

    constructor(
        notificationsStore: AppNotificationsStore
    )
    {
        super();

        this.timeline = new SidebarTimeline(
            this,
            notificationsStore);

        this.disposeToken.onDispose(() =>
        {
            this.timeline[Symbol.dispose]();
            this.content[Symbol.dispose]();
        });
    }

    activateContent(content: SidebarContent): void
    {
        if (this.content.value !== content)
        {
            if (this.content.value != undefined)
            {
                this.content.value.deactivate();
            }

            this.content.value = content;
        }
    }

    deactivateContent(content: SidebarContent): void
    {
        if (this.content.value === content)
        {
            this.content.value = undefined;
        }
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
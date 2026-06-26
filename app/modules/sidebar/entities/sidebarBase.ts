import { dependency } from '@/modules/shared/decorators/dependency';
import { Sidebar } from './sidebar';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { SidebarContent } from './sidebarContent';
import { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';
import { SidebarContentBase } from './sidebarContentBase';
import type { SidebarContentActivator } from './sidebarContentActivator';

@dependency(AppNotificationsStore)
export class SidebarBase extends Sidebar implements SidebarContentActivator
{
    private disposeToken = new DisposeToken();
    private contentInternal: SidebarContent | undefined;

    private contentChangeEvent = new EntityEvent<SidebarContent | undefined>({ deferred: true });

    readonly timeline: SidebarContent;

    constructor(
        notificationsStore: AppNotificationsStore
    )
    {
        super();

        this.timeline = new SidebarContentBase(
            this,
            notificationsStore.createTimeline());

        this.disposeToken.onDispose(() =>
        {
            this.timeline[Symbol.dispose]();
            this.contentChangeEvent[Symbol.dispose]();
        });
    }

    get content()
    {
        return this.contentInternal;
    }

    activateContent(content: SidebarContent): void
    {
        if (this.contentInternal != content)
        {
            if (this.contentInternal != undefined)
            {
                this.contentInternal.deactivate();
            }

            this.contentInternal = content;
            this.contentChangeEvent.emit(content);
        }
    }

    deactivateContent(content: SidebarContent): void
    {
        if (this.contentInternal == content)
        {
            this.contentInternal = undefined;
            this.contentChangeEvent.emit(undefined);
        }
    }

    override onContentChange(callback: Action<[SidebarContent | undefined]>, disposeToken?: DisposeToken): void
    {
        this.contentChangeEvent.on(callback, disposeToken);
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
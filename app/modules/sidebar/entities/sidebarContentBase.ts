import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';
import { SidebarContent } from './sidebarContent';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { SidebarContentActivator } from './sidebarContentActivator';
import { isEmptyable } from '@/modules/shared/interfaces/emptyable';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export class SidebarContentBase extends SidebarContent
{
    private disposeToken = new DisposeToken();

    private isActiveInternal = false;
    private isAvailableInternal = false;

    private activeStateChangeEvent = new EntityEvent<boolean>();
    private availabilityChangeEvent = new EntityEvent<boolean>();

    readonly key = getUniqueId('sidebar-content');

    constructor(
        private readonly contentActivator: SidebarContentActivator,
        private readonly content: UIElement
    )
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.activeStateChangeEvent[Symbol.dispose]();
        });

        this.setupContent(content);
    }

    get vnode(): VNode | undefined
    {
        return this.content?.vnode;
    }

    get isActive(): boolean
    {
        return this.isActiveInternal;
    }

    get isAvailable(): boolean
    {
        return this.isAvailableInternal;
    }

    override activate(): void
    {
        this.contentActivator.activateContent(this);
        this.setActivity(true);
    }

    override deactivate(): void
    {
        this.contentActivator.deactivateContent(this);
        this.setActivity(false);
    }

    override onActiveStateChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void
    {
        this.activeStateChangeEvent.on(callback, disposeToken);
    }

    override onAvailabilityChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void
    {
        this.availabilityChangeEvent.on(callback, disposeToken);
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }

    private setActivity(isActive: boolean): void
    {
        if (this.isActiveInternal !== isActive)
        {
            this.isActiveInternal = isActive;
            this.activeStateChangeEvent.emit(this.isActiveInternal);
        }
    }

    private setAvailability(isAvailable: boolean): void
    {
        if (this.isAvailableInternal === isAvailable)
            return;

        this.isAvailableInternal = isAvailable;
        this.availabilityChangeEvent.emit(isAvailable);
    }

    private setupContent(content: UIElement)
    {
        this.disposeToken.onDispose(() =>
        {
            content[Symbol.dispose]();
        });

        if (isEmptyable(content))
        {
            this.setAvailability(!content.isEmpty);

            content.onEmptyStateChange(isEmpty =>
            {
                this.setAvailability(!isEmpty);
            });
        }
        else
        {
            this.setAvailability(true);
        }
    }
}
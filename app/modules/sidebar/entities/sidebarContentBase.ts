import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { SidebarContent } from './sidebarContent';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { SidebarContentActivator } from './sidebarContentActivator';
import { isEmptyable } from '@/modules/shared/interfaces/emptyable';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { ObservableWritableBase } from '@/modules/shared/entities/observableWritableBase';

export class SidebarContentBase extends SidebarContent
{
    private disposeToken = new DisposeToken();

    readonly isActive = new ObservableWritableBase<boolean>(false);
    readonly isAvailable = new ObservableWritableBase<boolean>(false);

    readonly key = getUniqueId('sidebar-content');

    constructor(
        private readonly contentActivator: SidebarContentActivator,
        private readonly content: UIElement
    )
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.isActive[Symbol.dispose]();
            this.isAvailable[Symbol.dispose]();
        });

        this.setupContent(content);
    }

    get vnode(): VNode | undefined
    {
        return this.content?.vnode;
    }

    override activate(): void
    {
        this.contentActivator.activateContent(this);
        this.isActive.value = true;
    }

    override deactivate(): void
    {
        this.contentActivator.deactivateContent(this);
        this.isActive.value = false;
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }

    private setAvailability(isAvailable: boolean): void
    {
        this.isAvailable.value = isAvailable;
    }

    private setupContent(content: UIElement)
    {
        this.disposeToken.onDispose(() =>
        {
            content[Symbol.dispose]();
        });

        if (isEmptyable(content))
        {
            this.setAvailability(!content.isEmpty.value);

            content.isEmpty.on(isEmpty =>
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
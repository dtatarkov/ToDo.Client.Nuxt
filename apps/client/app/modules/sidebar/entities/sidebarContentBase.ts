import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { SidebarContent } from './sidebarContent';
import type { SidebarContentActivator } from './sidebarContentActivator';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { ObservableWritableBase } from '@/modules/shared/entities/observableWritableBase';

export abstract class SidebarContentBase extends SidebarContent
{
    protected disposeToken = new DisposeToken();

    readonly isActive = new ObservableWritableBase<boolean>(false);
    readonly key = getUniqueId('sidebar-content');

    constructor(
        protected readonly contentActivator: SidebarContentActivator
    )
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.isActive[Symbol.dispose]();
        });
    }

    override activate(): boolean
    {
        if (!this.canActivate.value || this.isActive.value)
        {
            return false;
        }

        this.handleActivation();
        this.contentActivator.activateContent(this);
        this.isActive.value = true;

        return true;
    }

    override deactivate(): boolean
    {
        if (!this.isActive.value)
        {
            return false;
        }

        this.handleDeactivation();
        this.contentActivator.deactivateContent(this);
        this.isActive.value = false;

        return true;
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
    protected handleActivation(): void
    {
        // Override in derived classes to provide activation side effects
    }

    protected handleDeactivation(): void
    {
        // Override in derived classes to provide deactivation side effects
    }
}
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { SidebarLayer } from './sidebarLayer';

export abstract class SidebarLayerBase<TContent extends UIElement> extends SidebarLayer<TContent>
{
    private isActiveInternal = false;
    private activeStateChangeEvent = new EntityEvent<boolean>({ skipEmitOnSameValue: true });
    protected availabilityChangeEvent = new EntityEvent<boolean>({ skipEmitOnSameValue: true });
    readonly key = getUniqueId('sidebar-layer');

    constructor(
        public override readonly content: TContent
    )
    {
        super();
    }

    override get isActive(): boolean
    {
        return this.isActiveInternal;
    }

    override set isActive(value: boolean)
    {
        if (this.isActiveInternal !== value)
        {
            this.isActiveInternal = value;
            this.activeStateChangeEvent.emit(this.isActiveInternal);
        }
    }

    override onActiveStateChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void
    {
        this.activeStateChangeEvent.on(callback, disposeToken);
    }

    override onAvailabilityChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void
    {
        this.availabilityChangeEvent.on(callback, disposeToken);
    }

    override get vnode()
    {
        return this.content.vnode;
    }

    override[Symbol.dispose](): void
    {
        this.activeStateChangeEvent[Symbol.dispose]();
        this.availabilityChangeEvent[Symbol.dispose]();
    }
}
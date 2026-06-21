import { UIElement } from '@/modules/uikit/entities/uiElement';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export class SidebarLayer<TContent extends UIElement> extends UIElement
{
    private isActiveInternal = false;
    private activeStateChangeEvent = new EntityEvent<boolean>({ skipEmitOnSameValue: true });
    readonly key = getUniqueId('sidebar-layer');

    constructor(
        public readonly content: TContent,
    )
    {
        super();
    }

    get isActive(): boolean
    {
        return this.isActiveInternal;
    }

    set isActive(value: boolean)
    {
        if (this.isActiveInternal !== value)
        {
            this.isActiveInternal = value;
            this.activeStateChangeEvent.emit(this.isActiveInternal);
        }
    }

    onActiveStateChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void
    {
        this.activeStateChangeEvent.on(callback, disposeToken);
    }

    override get vnode()
    {
        return this.content.vnode;
    }

    override[Symbol.dispose](): void
    {
        this.activeStateChangeEvent[Symbol.dispose]();
    }
}
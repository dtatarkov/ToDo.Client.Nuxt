import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonIcon } from './buttonIcon';
import { ButtonBase } from './buttonBase';
import VButtonIcon from '@/modules/uikit/components/VButtonIcon.vue';
import { shallowReactive, type VNode } from 'vue';

export class ButtonIconBase extends ButtonBase implements ButtonIcon
{
    protected data = shallowReactive({
        isDisabled: false,
        icon: ''
    });

    readonly key = getUniqueId('button-element-icon');

    private onClickFn = () =>
    {
        this.handleClick();
    };

    get vnode(): VNode
    {
        return h(VButtonIcon, {
            ...this.data,

            onClick: this.onClickFn,
        });
    }

    get icon(): string
    {
        return this.data.icon;
    }

    set icon(value: string)
    {
        this.data.icon = value;
    }

    get isDisabled(): boolean
    {
        return this.data.isDisabled;
    }

    override disable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.data.isDisabled = true;
    }

    override enable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.data.isDisabled = false;
    }
}
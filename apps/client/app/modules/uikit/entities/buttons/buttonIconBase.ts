import { getUniqueId, Icon } from '@client/shared';
import type { ButtonIcon } from './buttonIcon';
import { ButtonBase } from './buttonBase';
import { shallowReactive, type VNode } from 'vue';
import { VButtonIcon } from '@client/ui-vue';
export class ButtonIconBase extends ButtonBase implements ButtonIcon
{
    private data = shallowReactive({
        isDisabled: false,
        icon: Icon.questionMarkCircle
    });

    readonly key = getUniqueId('button-element-icon');

    private onClickFn = () =>
    {
        this.click();
    };

    get vnode(): VNode
    {
        return h(VButtonIcon, {
            ...this.data,

            onClick: this.onClickFn,
        });
    }

    get icon(): Icon
    {
        return this.data.icon;
    }

    set icon(value: Icon)
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
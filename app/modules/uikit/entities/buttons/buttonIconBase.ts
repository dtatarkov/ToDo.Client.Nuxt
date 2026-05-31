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

    key = getUniqueId('button-element-icon');

    private onClickFn = () =>
    {
        this.clickHandler.handle();
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

    set isDisabled(value: boolean)
    {
        this.data.isDisabled = value;
    }
}
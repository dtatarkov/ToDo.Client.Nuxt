import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonGeneral } from './buttonGeneral';
import type { Color } from '../../types/color';
import { ButtonBase } from './buttonBase';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import { shallowReactive, type VNode } from 'vue';

export class ButtonGeneralBase extends ButtonBase implements ButtonGeneral
{
    protected data = shallowReactive({
        title: '',
        color: <Color>'neutral',
        isDisabled: false,
        isLoading: false,
    });

    readonly key = getUniqueId('button-element-general');

    private onClickFn = () =>
    {
        this.clickHandler.handle();
    };

    get vnode(): VNode
    {
        return h(VButtonGeneral, {
            ...this.data,

            onClick: this.onClickFn,
        });
    }

    get title(): string
    {
        return this.data.title;
    }

    set title(value: string)
    {
        this.data.title = value;
    }

    get color(): Color
    {
        return this.data.color;
    }

    set color(value: Color)
    {
        this.data.color = value;
    }

    get isDisabled(): boolean
    {
        return this.data.isDisabled;
    }

    set isDisabled(value: boolean)
    {
        this.data.isDisabled = value;
    }

    get isLoading(): boolean
    {
        return this.data.isLoading;
    }

    set isLoading(value: boolean)
    {
        this.data.isLoading = value;
    }
}
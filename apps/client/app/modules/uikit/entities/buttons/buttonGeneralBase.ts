import { getUniqueId } from '@client/shared';
import type { ButtonGeneral } from './buttonGeneral';
import type { Color } from '../../types/color';
import { ButtonBase } from './buttonBase';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import { shallowReactive, type VNode } from 'vue';
import type { AsyncCommand } from '@client/shared';

export class ButtonGeneralBase extends ButtonBase implements ButtonGeneral
{
    private data = shallowReactive({
        title: '',
        color: <Color>'neutral',
        isDisabled: false,
        isLoading: false,
    });

    readonly key = getUniqueId('button-element-general');

    private onClickFn = () =>
    {
        this.click();
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

    get isLoading(): boolean
    {
        return this.data.isLoading;
    }

    override setCommand(command: AsyncCommand): void
    {
        super.setCommand(command);

        command.onIdle(() =>
        {
            this.hideLoader();
        }, this.disposeToken);

        command.onExecuting(() =>
        {
            this.showLoader();
        }, this.disposeToken);
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

    showLoader(): void
    {
        this.disposeToken.assertNotDisposed();
        this.data.isLoading = true;
    }

    hideLoader(): void
    {
        this.disposeToken.assertNotDisposed();
        this.data.isLoading = false;
    }
}
import { h } from 'vue';
import type { Toast } from './toast';
import type { ToastConfiguration } from './toastConfiguration';
import VNotification from '../components/VNotification.vue';
import { getUniqueId } from '@packages/shared';
import type { ToastsStore } from './toastsStore';
import type { Color } from '@/modules/uikit/types/color';
import type { ToastData } from '../types/toastData';
import type { Icon } from '@packages/shared';
import { OverlayElementBase } from './overlayElementBase';

export class ToastBase extends OverlayElementBase<ToastsStore> implements Toast
{
    private data: ToastData;
    private onCloseFn = () => this.close();

    readonly key = getUniqueId('notification');


    constructor(
        store: ToastsStore,
        configuration: ToastConfiguration,
    )
    {
        super(store);

        this.data = {
            id: configuration.id,
            title: configuration.title,
            description: configuration.description,
            icon: configuration.icon,
            color: configuration.color ?? 'neutral'
        };
    }

    get id(): string | undefined
    {
        return this.data.id;
    }

    get title(): string
    {
        return this.data.title;
    }

    get description(): string
    {
        return this.data.description;
    }

    get icon(): Icon
    {
        return this.data.icon;
    }

    get color(): Color
    {
        return this.data.color;
    }

    get vnode()
    {
        return h(VNotification, {
            ...this.data,

            onClose: this.onCloseFn,
        });
    }

    override getData()
    {
        return this.data;
    }
}
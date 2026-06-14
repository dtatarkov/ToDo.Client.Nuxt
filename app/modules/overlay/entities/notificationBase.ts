import { h } from 'vue';
import { Notification } from './notification';
import type { NotificationConfiguration } from './notificationConfiguration';
import VNotification from '../components/VNotification.vue';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';
import type { Overlay } from './overlay';
import type { Color } from '@/modules/uikit/types/color';
import type { NotificationData } from '../types/notificationData';

export class NotificationBase extends Notification
{
    private overlay: Overlay | undefined;
    private data: NotificationData;

    private disposeToken = new DisposeToken();

    private onCloseFn = () => this.close();

    readonly key = getUniqueId('notification');

    constructor(configuration: NotificationConfiguration)
    {
        super();

        this.data = {
            title: configuration.title,
            description: configuration.description,
            icon: configuration.icon,
            color: configuration.color ?? 'neutral'
        };
    }

    get title(): string
    {
        return this.data.title;
    }

    get description(): string
    {
        return this.data.description;
    }

    get icon(): string
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

    override close()
    {
        this.overlay?.removeElement(this);
        this[Symbol.dispose]();
    }

    override setOverlay(overlay: Overlay)
    {
        this.disposeToken.assertNotDisposed();

        if (this.overlay)
        {
            throw new InitializationOnlyException('overlay');
        }

        this.overlay = overlay;
    }

    override[Symbol.dispose](): void
    {
        if (this.disposeToken.isDisposed)
        {
            return;
        }

        this.disposeToken[Symbol.dispose]();
    }
}
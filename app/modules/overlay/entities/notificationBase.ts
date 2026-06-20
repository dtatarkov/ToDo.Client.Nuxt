import { h } from 'vue';
import type { Notification } from './notification';
import type { NotificationConfiguration } from './notificationConfiguration';
import VNotification from '../components/VNotification.vue';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { NotificationsStore } from './notificationsStore';
import type { Color } from '@/modules/uikit/types/color';
import type { NotificationData } from '../types/notificationData';
import type { Icon } from '@/modules/shared/enums/icons';
import { OverlayElementBase } from './overlayElementBase';

export class NotificationBase extends OverlayElementBase<NotificationsStore> implements Notification
{
    private data: NotificationData;
    private onCloseFn = () => this.close();

    readonly key = getUniqueId('notification');


    constructor(
        store: NotificationsStore,
        configuration: NotificationConfiguration,
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
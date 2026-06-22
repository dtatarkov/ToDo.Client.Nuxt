import { Notification } from './notification';
import type { NotificationData } from '../types/notificationData';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Icon } from '@/modules/shared/enums/icons';

export class NotificationBase extends Notification
{
    readonly date: Date;
    readonly title: string;
    readonly description: string;
    readonly icon: Icon;

    constructor(
        private overlay: Overlay,
        data: NotificationData,
    )
    {
        super();

        this.date = data.date;
        this.title = data.title;
        this.description = data.description;
        this.icon = data.icon;
    }

    showToast(): void
    {
        this.overlay.createNotification({
            title: this.title,
            description: this.description,
            icon: this.icon,
            color: 'error',
        });
    }
}
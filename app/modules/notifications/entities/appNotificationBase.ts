import { AppNotification } from './appNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Icon } from '@/modules/shared/enums/icons';

export class AppNotificationBase extends AppNotification
{
    readonly date: Date;
    readonly title: string;
    readonly description: string;
    readonly icon: Icon;

    constructor(
        private overlay: Overlay,
        data: AppNotificationData,
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
        this.overlay.createToast({
            title: this.title,
            description: this.description,
            icon: this.icon,
            color: 'error',
        });
    }
}
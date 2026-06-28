import { AppNotification } from './appNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import { NotificationType } from '../types/notificationType';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Icon } from '@/modules/shared/enums/icons';
import type { Color } from '@/modules/uikit/types/color';

export class AppNotificationBase extends AppNotification
{
    private readonly colorInternal: Color;

    readonly date: Date;
    readonly title: string;
    readonly description: string;
    readonly icon: Icon;
    readonly type: NotificationType;

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
        this.type = data.type;
        this.colorInternal = this.calculateColor(data.type);
    }



    getColor(): Color
    {
        return this.colorInternal;
    }

    showToast(): void
    {
        this.overlay.createToast({
            title: this.title,
            description: this.description,
            icon: this.icon,
            color: this.getColor(),
        });
    }

    private calculateColor(type: NotificationType): Color
    {
        switch (type)
        {
            case NotificationType.Error:
                return 'error';
            default:
                return 'neutral';
        }
    }
}
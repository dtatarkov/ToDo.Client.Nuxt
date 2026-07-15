import type { Icon } from '@client/shared';
import type { NotificationType } from '../types/notificationType';
import type { Color } from '@client/ui-core';

export abstract class AppNotification
{
    abstract readonly date: Date;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;
    abstract readonly type: NotificationType;
    abstract readonly groupId?: string;

    abstract getColor(): Color;
    abstract showToast(): void;
}
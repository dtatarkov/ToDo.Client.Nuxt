import type { Icon } from '@/modules/shared/enums/icons';
import type { NotificationType } from '../types/notificationType';

export abstract class AppNotification
{
    abstract readonly date: Date;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;
    abstract readonly type: NotificationType;

    abstract showToast(): void;
}
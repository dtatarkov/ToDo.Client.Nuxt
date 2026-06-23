import type { Icon } from '@/modules/shared/enums/icons';

export abstract class AppNotification
{
    abstract readonly date: Date;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;

    abstract showToast(): void;
}
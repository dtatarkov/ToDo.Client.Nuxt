import type { AppNotificationData } from '../types/appNotificationData';
import { AppNotification } from './appNotification';

export abstract class AppRootNotification extends AppNotification
{
    abstract readonly children: readonly AppNotification[];

    abstract addNotification(data: AppNotificationData): false | AppNotification;
}

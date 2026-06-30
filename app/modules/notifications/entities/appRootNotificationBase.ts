import type { AppRootNotification } from './appRootNotification';
import type { AppNotification } from './appNotification';
import { AppNotificationBase } from './appNotificationBase';
import type { AppNotificationData } from '../types/appNotificationData';

export class AppRootNotificationBase extends AppNotificationBase implements AppRootNotification
{
    private readonly childrenInternal: AppNotification[] = [];

    get children(): readonly AppNotification[]
    {
        return this.childrenInternal;
    }

    addNotification(data: AppNotificationData): false | AppNotification
    {
        // If AppRootNotification groupId is undefined, adding child notification is forbidden
        if (this.groupId === undefined)
        {
            return false;
        }

        // If AppRootNotification groupId is defined, data groupId must match
        if (data.groupId === this.groupId)
        {
            const childNotification = this.addChildNotification(data);
            return childNotification;
        }

        return false;
    }

    private addChildNotification(data: AppNotificationData): AppNotification
    {
        const childNotification = new AppNotificationBase(this.overlay, data);
        this.childrenInternal.push(childNotification);

        return childNotification;
    }
}

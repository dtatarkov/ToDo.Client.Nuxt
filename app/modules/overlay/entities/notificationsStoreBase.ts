import { NotificationsStore } from './notificationsStore';
import type { Notification } from './notification';
import { isStringEmpty } from '../../shared/utils/isStringEmpty';

export class NotificationsStoreBase extends NotificationsStore
{
    override remove(notification: Notification): void
    {
        super.remove(notification);
    }

    override add(notification: Notification): void
    {
        if (!isStringEmpty(notification.id))
        {
            const groupNotifications = this.elements.filter(x => x.id === notification.id);

            if (groupNotifications)
            {
                groupNotifications.forEach(x => x.close());
            }
        }

        super.add(notification);
    }
}
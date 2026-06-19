import type { NotificationsStore } from './notificationsStore';
import type { Notification } from './notification';
import { isStringEmpty } from '../../shared/utils/isStringEmpty';
import { OverlayElementsStoreBase } from './overlayElementsStoreBase';

export class NotificationsStoreBase extends OverlayElementsStoreBase<Notification> implements NotificationsStore
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
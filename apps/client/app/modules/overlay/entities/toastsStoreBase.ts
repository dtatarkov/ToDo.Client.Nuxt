import type { ToastsStore } from './toastsStore';
import type { Toast } from './toast';
import { OverlayElementsStoreBase } from './overlayElementsStoreBase';
import { isStringEmpty } from '@packages/shared';

export class ToastsStoreBase extends OverlayElementsStoreBase<Toast> implements ToastsStore
{
    override remove(notification: Toast): void
    {
        super.remove(notification);
    }

    override add(notification: Toast): void
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
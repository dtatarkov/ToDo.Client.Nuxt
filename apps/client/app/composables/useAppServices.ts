import { registerFormsServices } from '@/modules/forms/utils/registerFormsServices';
import { registerOverlayServices } from '@/modules/overlay/utils/registerOverlayServices';
import { registerSharedServices } from '@/modules/shared/utils/registerSharedServices';
import { registerTodoServices } from '@/modules/todo/utils/registerTodoServices';
import { registerUIKitServices } from '@/modules/uikit/utils/registerUIKitServices';
import { registerSidebarServices } from '@/modules/sidebar/utils/registerSidebarServices';
import { registerNotificationsServices } from '@/modules/notifications/utils/registerNotificationsServices';
import { useServicesContainer } from '@/composables/useServicesContainer';

export function useAppServices()
{
    const container = useServicesContainer(true);

    registerSharedServices(container);
    registerUIKitServices(container);
    registerFormsServices(container);
    registerOverlayServices(container);
    registerTodoServices(container);
    registerSidebarServices(container);
    registerNotificationsServices(container);
}
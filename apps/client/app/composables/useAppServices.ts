import { useFormsServices } from '@/modules/forms/composables/useFormsServices';
import { useOverlayServices } from '@/modules/overlay/composables/useOverlayServices';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';
import { useTodoServices } from '@/modules/todo/composables/useTodoServices';
import { useUIKitServices } from '@/modules/uikit/composables/useUIKitServices';
import { useSidebarServices } from '@/modules/sidebar/composables/useSidebarServices';
import { useNotificationsServices } from '@/modules/notifications/composables/useNotificationsServices';

export function useAppServices()
{
    useServicesContainer(true);

    useSharedServices();
    useUIKitServices();
    useFormsServices();
    useOverlayServices();
    useTodoServices();
    useSidebarServices();
    useNotificationsServices();
}
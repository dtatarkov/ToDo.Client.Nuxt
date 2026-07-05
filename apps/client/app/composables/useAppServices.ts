import { registerFormsServices } from '@/modules/forms/utils/registerFormsServices';
import { registerOverlayServices } from '@/modules/overlay/utils/registerOverlayServices';
import { registerSharedServices } from '@packages/shared';
import { registerTodoServices } from '@/modules/todo/utils/registerTodoServices';
import { registerUIKitServices } from '@/modules/uikit/utils/registerUIKitServices';
import { registerSidebarServices } from '@/modules/sidebar/utils/registerSidebarServices';
import { registerNotificationsServices } from '@/modules/notifications/utils/registerNotificationsServices';
import { registerDateTimeServices } from '@packages/datetime';
import { useServicesContainer } from '@/composables/useServicesContainer';
import { useRuntimeConfig, useI18n } from '#imports';

export function useAppServices()
{
    const container = useServicesContainer();
    const { t } = useI18n();
    const config = useRuntimeConfig();

    registerDateTimeServices(container, config.public.locale);
    registerSharedServices(container, t);
    registerUIKitServices(container);
    registerFormsServices(container);
    registerOverlayServices(container);
    registerTodoServices(container);
    registerSidebarServices(container);
    registerNotificationsServices(container);
}

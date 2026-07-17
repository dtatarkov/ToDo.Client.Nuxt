import { registerFormsServices } from '@/modules/forms/utils/registerFormsServices';
import { registerOverlayServices } from '@/modules/overlay/utils/registerOverlayServices';
import { registerTodoServices } from '@/modules/todo/utils/registerTodoServices';
import { registerUIKitServices } from '@/modules/uikit/utils/registerUIKitServices';
import { registerSidebarServices } from '@/modules/sidebar/utils/registerSidebarServices';
import { registerNotificationsServices } from '@/modules/notifications/utils/registerNotificationsServices';
import { registerDateTimeServices } from '@client/infrastructure-datetime';
import { useRuntimeConfig } from '#imports';
import { SSRLoader } from '@client/infrastructure-ssr';
import { DisposeToken, MessagesService, MessagesServiceImpl } from '@client/shared';
import { registerLoggingServices } from '@client/infrastructure-logging';

export function useAppServices()
{
    const container = useServicesContainer();
    const config = useRuntimeConfig();
    const ssrLoader = useSSRLoader();
    const { t } = useI18n();

    container.bind(DisposeToken).to(DisposeToken).asTransient();
    container.bind(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    container.bind(SSRLoader).toDynamicValue(() => ssrLoader).asSingleton();

    registerLoggingServices(container);
    registerDateTimeServices(container, config.public.locale);
    registerUIKitServices(container);
    registerFormsServices(container);
    registerOverlayServices(container);
    registerTodoServices(container);
    registerSidebarServices(container);
    registerNotificationsServices(container);
}

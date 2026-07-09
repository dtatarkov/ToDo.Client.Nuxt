import { registerFormsServices } from '@/modules/forms/utils/registerFormsServices';
import { registerOverlayServices } from '@/modules/overlay/utils/registerOverlayServices';
import { registerTodoServices } from '@/modules/todo/utils/registerTodoServices';
import { registerUIKitServices } from '@/modules/uikit/utils/registerUIKitServices';
import { registerSidebarServices } from '@/modules/sidebar/utils/registerSidebarServices';
import { registerNotificationsServices } from '@/modules/notifications/utils/registerNotificationsServices';
import { registerDateTimeServices } from '@client/datetime';
import { useServicesContainer } from '@/composables/useServicesContainer';
import { useRuntimeConfig } from '#imports';
import { DisposeToken, ZonedDateTimeMapper, ZonedDateTimeMapperImpl, TimeMapper, TimeMapperImpl, MessagesService, MessagesServiceImpl, LoggingService, LoggingServiceImpl } from '@client/shared';

export function useAppServices()
{
    const container = useServicesContainer();
    const config = useRuntimeConfig();
    const { t } = useI18n();

    container.bind(DisposeToken).to(DisposeToken).asTransient();
    container.bind(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    container.bind(TimeMapper).to(TimeMapperImpl).asTransient();
    container.bind(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    container.bind(LoggingService).to(LoggingServiceImpl).asSingleton();

    registerDateTimeServices(container, config.public.locale);
    registerUIKitServices(container);
    registerFormsServices(container);
    registerOverlayServices(container);
    registerTodoServices(container);
    registerSidebarServices(container);
    registerNotificationsServices(container);
}

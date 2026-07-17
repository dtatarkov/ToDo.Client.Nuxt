import { DateFormatter, DateFormatterConfiguration, DateFormatterImpl, DateParser, DateParserImpl, TimeMapper, TimeMapperImpl, ZonedDateTimeMapper, ZonedDateTimeMapperImpl } from '@client/infrastructure-datetime';
import { useRuntimeConfig } from '#imports';
import { SSRLoader } from '@client/infrastructure-ssr';
import { DisposeToken } from '@client/shared';
import { LoggingService, LoggingServiceImpl } from '@client/infrastructure-logging';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ButtonsFactoryImpl } from '@/modules/uikit/factories/buttonsFactoryImpl';
import { Timeline } from '@/modules/notifications/entities/timeline';
import { TimelineBase } from '@/modules/notifications/entities/timelineBase';
import { FormElementsFactory } from '@/modules/forms/factories/formElementsFactory';
import { FormFactory } from '@/modules/forms/factories/formFactory';
import { InputElementsFactory } from '@/modules/forms/factories/inputElementsFactory';
import { InputElementsFactoryImpl } from '@/modules/forms/factories/inputElementsFactoryImpl';
import { FormFactoryImpl } from '@/modules/forms/factories/formFactoryImpl';
import { FormElementsFactoryImpl } from '@/modules/forms/factories/formElementsFactoryImpl';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { OverlayBase } from '@/modules/overlay/entities/overlayBase';
import { ToDosRepository, ToDosRepositoryConfiguration } from '@/modules/todo/repositories/todosRepository';
import { ToDoDtoMapper } from '@/modules/todo/mappers/todoDtoMapper';
import { ToDosOwner } from '@/modules/todo/entities/todosOwner';
import { ToDoFactory } from '@/modules/todo/factories/todoFactory';
import { ToDoFactoryImpl } from '@/modules/todo/factories/todoFactoryImpl';
import { ToDosOwnerBase } from '@/modules/todo/entities/todosOwnerBase';
import { ToDoDtoMapperImpl } from '@/modules/todo/mappers/todoDtoMapperImpl';
import { ToDosRepositoryImpl } from '@/modules/todo/repositories/todosRepositoryImpl';
import { Sidebar } from '@/modules/sidebar/entities/sidebar';
import { SidebarBase } from '@/modules/sidebar/entities/sidebarBase';
import { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';
import { AppNotificationsStoreBase } from '@/modules/notifications/entities/appNotificationsStoreBase';
import { MessagesService, MessagesServiceImpl } from '@client/infrastructure-messages';

export function useAppServices()
{
    const container = useServicesContainer();
    const config = useRuntimeConfig();
    const ssrLoader = useSSRLoader();
    const { t } = useI18n();

    container.bind(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    container.bind(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    container.bind(ToDosOwner).to(ToDosOwnerBase).asSingleton();
    container.bind(ToDoFactory).to(ToDoFactoryImpl).asTransient();

    container.bind(Overlay).to(OverlayBase).asSingleton();
    container.bind(Sidebar).to(SidebarBase).asSingleton();
    container.bind(Timeline).to(TimelineBase).asSingleton();
    container.bind(AppNotificationsStore).to(AppNotificationsStoreBase).asSingleton();
    container.bind(LoggingService).to(LoggingServiceImpl).asSingleton();
    container.bind(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    container.bind(SSRLoader).toDynamicValue(() => ssrLoader).asSingleton();

    container.bind(FormElementsFactory).to(FormElementsFactoryImpl).asTransient();
    container.bind(FormFactory).to(FormFactoryImpl).asTransient();
    container.bind(InputElementsFactory).to(InputElementsFactoryImpl).asTransient();

    container.bind(ButtonsFactory).to(ButtonsFactoryImpl).asTransient();

    container.bind(DateParser).to(DateParserImpl).asTransient();
    container.bind(DateFormatter).to(DateFormatterImpl).asTransient();
    container.bind(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    container.bind(TimeMapper).to(TimeMapperImpl).asTransient();
    container.bind(DisposeToken).to(DisposeToken).asTransient();

    container.bind(ToDosRepositoryConfiguration)
        .toDynamicValue((): ToDosRepositoryConfiguration =>
        ({
            apiBaseUrl: config.public.apiBaseUrl,
        }))
        .asSingleton();

    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration => ({
            locale: config.public.locale,
        }))
        .asSingleton();
}

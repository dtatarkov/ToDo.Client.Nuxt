import { DateFormatter, DateFormatterConfiguration, DateFormatterImpl, DateParser, DateParserImpl, TimeMapper, TimeMapperImpl, ZonedDateTimeMapper, ZonedDateTimeMapperImpl } from '@client/infrastructure-datetime';
import { useRuntimeConfig } from '#imports';
import { SSRLoader } from '@client/infrastructure-ssr';
import { DisposeToken } from '@client/shared';
import { LoggingService, LoggingServiceImpl } from '@client/infrastructure-logging';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ButtonsFactoryImpl } from '@/modules/uikit/factories/buttonsFactoryImpl';
import { Timeline } from '@/modules/notifications/entities/timeline';
import { TimelineBase } from '@/modules/notifications/entities/timelineBase';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { OverlayBase } from '@/modules/overlay/entities/overlayBase';
import { Sidebar } from '@/modules/sidebar/entities/sidebar';
import { SidebarBase } from '@/modules/sidebar/entities/sidebarBase';
import { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';
import { AppNotificationsStoreBase } from '@/modules/notifications/entities/appNotificationsStoreBase';
import { MessagesService, MessagesServiceImpl } from '@client/infrastructure-messages';
import { ToDoDtoMapper, ToDoDtoMapperImpl, ToDoFactory, ToDoFactoryImpl, ToDosStore, ToDosStoreBase, ToDosRepository } from '@client/domain-todo';
import { provideServicesContainer } from '@client/ui-vue';
import { ServicesContainer } from '@client/infrastructure-di';
import { UIKitViewmodelsFactory, UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';
import { ToDoCardViewmodel, ToDoCardViewmodelImpl, ToDosWidgetViewmodel, ToDosWidgetViewmodelImpl } from '@client/ui-todo';
import { FormElementViewmodelsFactory, FormElementViewmodelsFactoryImpl, FormViewmodelFactory, FormViewmodelFactoryImpl } from '@client/ui-forms';
export function useAppServices()
{
    const container = new ServicesContainer();
    const config = useRuntimeConfig();
    const ssrLoader = useSSRLoader();
    const { t } = useI18n();

    container.bind(ToDosRepository).toDynamicValue(() => useToDosRepository()).asTransient();
    container.bind(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    container.bind(ToDosStore).to(ToDosStoreBase).asSingleton();
    container.bind(ToDoFactory).to(ToDoFactoryImpl).asTransient();

    container.bind(Overlay).to(OverlayBase).asSingleton();
    container.bind(Sidebar).to(SidebarBase).asSingleton();
    container.bind(Timeline).to(TimelineBase).asSingleton();
    container.bind(AppNotificationsStore).to(AppNotificationsStoreBase).asSingleton();
    container.bind(LoggingService).to(LoggingServiceImpl).asSingleton();
    container.bind(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    container.bind(SSRLoader).toDynamicValue(() => ssrLoader).asSingleton();

    container.bind(FormElementViewmodelsFactory).to(FormElementViewmodelsFactoryImpl).asTransient();
    container.bind(FormViewmodelFactory).to(FormViewmodelFactoryImpl).asTransient();
    container.bind(UIKitViewmodelsFactory).to(UIKitViewmodelsFactoryImpl).asTransient();

    container.bind(ButtonsFactory).to(ButtonsFactoryImpl).asTransient();

    container.bind(ToDosWidgetViewmodel).to(ToDosWidgetViewmodelImpl).asTransient();
    container.bind(ToDoCardViewmodel).to(ToDoCardViewmodelImpl).asTransient();

    container.bind(DateParser).to(DateParserImpl).asTransient();
    container.bind(DateFormatter).to(DateFormatterImpl).asTransient();
    container.bind(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    container.bind(TimeMapper).to(TimeMapperImpl).asTransient();
    container.bind(DisposeToken).to(DisposeToken).asTransient();

    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration => ({
            locale: config.public.locale,
        }))
        .asSingleton();

    provideServicesContainer(container);
}

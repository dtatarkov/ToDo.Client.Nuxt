import { ServicesContainer } from '@client/infrastructure-di';
import { MessagesService, MessagesServiceImpl } from '@client/infrastructure-messages';
import { InfoBlockViewmodel, InfoBlockViewmodelImpl, ToDoCardViewmodel, ToDoCardViewmodelImpl, ToDosWidgetViewmodel, ToDosWidgetViewmodelImpl } from '@client/ui-core';
import { provideServicesContainer } from '@client/ui-vue';
import { useI18n } from 'vue-i18n';
import { DateFormatter, DateFormatterConfiguration, DateFormatterImpl, TimeMapper, TimeMapperImpl, ZonedDateTimeMapper, ZonedDateTimeMapperImpl } from '@client/infrastructure-datetime';
import { DisposeToken } from '@client/shared';

export function useStorybookServices()
{
    const container = new ServicesContainer();
    const { t } = useI18n();

    container.bind(ToDosWidgetViewmodel).to(ToDosWidgetViewmodelImpl).asTransient();
    container.bind(ToDoCardViewmodel).to(ToDoCardViewmodelImpl).asTransient();
    container.bind(InfoBlockViewmodel).to(InfoBlockViewmodelImpl).asTransient();

    container.bind(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    container.bind(DateFormatter).to(DateFormatterImpl).asTransient();
    container.bind(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    container.bind(TimeMapper).to(TimeMapperImpl).asTransient();

    container.bind(DisposeToken).to(DisposeToken).asTransient();

    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration => ({
            locale: 'ru',
        }))
        .asSingleton();

    provideServicesContainer(container);
}
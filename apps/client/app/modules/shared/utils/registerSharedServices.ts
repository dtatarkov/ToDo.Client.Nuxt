import type { ServicesContainer } from '@packages/di';
import { DateParser } from "../services/dateParser";
import { DateParserImpl } from "../services/dateParserImpl";
import { DateFormatter, DateFormatterConfiguration } from "../services/dateFormatter";
import { DateFormatterImpl } from "../services/dateFormatterImpl";
import { TimeMapperImpl } from "../mappers/timeMapperImpl";
import { ZonedDateTimeMapperImpl } from "../mappers/zonedDateTimeMapperImpl";
import { ZonedDateTimeMapper } from "../mappers/zonedDateTimeMapper";
import { TimeMapper } from "../mappers/timeMapper";
import { useRuntimeConfig, useI18n } from "#imports";
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { MessagesService } from '@/modules/shared/services/messagesService';
import { MessagesServiceImpl } from '@/modules/shared/services/messagesServiceImpl';
import { LoggingService } from '@/modules/shared/services/loggingService';
import { LoggingServiceImpl } from '@/modules/shared/services/loggingServiceImpl';

export function registerSharedServices(container: ServicesContainer): void
{
    const { t } = useI18n();
    const config = useRuntimeConfig();

    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration =>
        ({
            locale: config.public.locale,
        }))
        .asSingleton();

    container.bind(DisposeToken).to(DisposeToken).asTransient();
    container.bind(DateParser).to(DateParserImpl).asTransient();
    container.bind(DateFormatter).to(DateFormatterImpl).asTransient();
    container.bind(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    container.bind(TimeMapper).to(TimeMapperImpl).asTransient();
    container.bind(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    container.bind(LoggingService).to(LoggingServiceImpl).asSingleton();
}

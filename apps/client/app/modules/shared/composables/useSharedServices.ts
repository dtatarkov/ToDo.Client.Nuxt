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


export function useSharedServices(): void
{
    const { t } = useI18n();
    const config = useRuntimeConfig();

    useServiceRegistration(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration =>
        ({
            locale: config.public.locale,
        }))
        .asSingleton();

    useServiceRegistration(DisposeToken).to(DisposeToken).asTransient();
    useServiceRegistration(DateParser).to(DateParserImpl).asTransient();
    useServiceRegistration(DateFormatter).to(DateFormatterImpl).asTransient();
    useServiceRegistration(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    useServiceRegistration(TimeMapper).to(TimeMapperImpl).asTransient();
    useServiceRegistration(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    useServiceRegistration(LoggingService).to(LoggingServiceImpl).asSingleton();
}
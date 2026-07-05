import type { ServicesContainer } from '@packages/di';
import { DateParser } from "../services/dateParser";
import { DateParserImpl } from "../services/dateParserImpl";
import { DateFormatter, DateFormatterConfiguration } from "../services/dateFormatter";
import { DateFormatterImpl } from "../services/dateFormatterImpl";
import { TimeMapperImpl } from "../mappers/timeMapperImpl";
import { ZonedDateTimeMapperImpl } from "../mappers/zonedDateTimeMapperImpl";
import { ZonedDateTimeMapper } from "../mappers/zonedDateTimeMapper";
import { TimeMapper } from "../mappers/timeMapper";
import { DisposeToken } from '../entities/disposeToken';
import { MessagesService } from '../services/messagesService';
import { MessagesServiceImpl } from '../services/messagesServiceImpl';
import { LoggingService } from '../services/loggingService';
import { LoggingServiceImpl } from '../services/loggingServiceImpl';
import type { Func } from '../types/func';

export function registerSharedServices(
    container: ServicesContainer,
    t: Func<string, [key: string, params?: Record<string, string | number>]>,
    locale: string,
): void
{
    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration =>
        ({
            locale,
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

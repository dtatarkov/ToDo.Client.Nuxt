import type { ServicesContainer } from '@client/infrastructure-di';
import { DateFormatter, DateFormatterConfiguration } from '../services/dateFormatter';
import { DateFormatterImpl } from '../services/dateFormatterImpl';
import { DateParserImpl } from '../services/dateParserImpl';
import { DateParser } from '../services/dateParser';
import { ZonedDateTimeMapper } from '../mappers/zonedDateTimeMapper';
import { ZonedDateTimeMapperImpl } from '../mappers/zonedDateTimeMapperImpl';
import { TimeMapperImpl } from '../mappers/timeMapperImpl';
import { TimeMapper } from '../mappers/timeMapper';

export function registerDateTimeServices(container: ServicesContainer, locale: string): void
{
    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration => ({
            locale,
        }))
        .asSingleton();

    container.bind(DateParser).to(DateParserImpl).asTransient();
    container.bind(DateFormatter).to(DateFormatterImpl).asTransient();
    container.bind(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    container.bind(TimeMapper).to(TimeMapperImpl).asTransient();
}

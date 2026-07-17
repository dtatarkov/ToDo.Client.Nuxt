import type { ServicesContainer } from '@client/di';
import { DateFormatter, DateFormatterConfiguration } from '../services/dateFormatter';
import { DateFormatterImpl } from '../services/dateFormatterImpl';
import { DateParserImpl } from '../services/dateParserImpl';
import { DateParser } from '../services/dateParser';

export function registerDateTimeServices(container: ServicesContainer, locale: string): void
{
    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration => ({
            locale,
        }))
        .asSingleton();

    container.bind(DateParser).to(DateParserImpl).asTransient();
    container.bind(DateFormatter).to(DateFormatterImpl).asTransient();
}

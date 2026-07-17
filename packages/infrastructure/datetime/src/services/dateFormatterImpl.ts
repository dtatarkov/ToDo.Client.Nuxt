import { DateTime } from 'luxon';
import { DateFormatter, DateFormatterConfiguration } from './dateFormatter';
import { dependency } from '@client/infrastructure-di';

@dependency(DateFormatterConfiguration)
export class DateFormatterImpl extends DateFormatter
{
    constructor(private config: DateFormatterConfiguration)
    {
        super();
    }

    formatDate(date: Date, options = DateTime.DATETIME_SHORT): string
    {
        const dateTime = DateTime.fromJSDate(date);

        if (!dateTime.isValid)
        {
            throw new Error(`Invalid date(${date.toString()})`);
        }

        const result = dateTime
            .setLocale(this.config.locale)
            .toLocaleString(options);

        if (!result)
        {
            throw new Error(`Date(${date.toString()}) formatting error`);
        }

        return result;
    }

    formatDateOptional(date?: Date, options?: Intl.DateTimeFormatOptions): string
    {
        if (!date)
        {
            return '';
        }

        return this.formatDate(date, options);
    }
}

import { DateTime } from 'luxon';
import { DateFormatter } from './dateFormatter';
import { AppPublicRuntimeConfig } from "../interfaces/appPublicRuntimeConfig";
import { dependency } from '../decorators/dependency';

@dependency(AppPublicRuntimeConfig)
export class DateFormatterImpl extends DateFormatter
{
    constructor(private config: AppPublicRuntimeConfig)
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
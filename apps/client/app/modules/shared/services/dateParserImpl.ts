import { DateTime } from 'luxon';
import { DateParser } from './dateParser';

export class DateParserImpl extends DateParser
{
    fromString(dateString: string): Date
    {
        const dateTime = DateTime.fromISO(dateString);

        if (!dateTime.isValid)
        {
            throw new Error(`Date(${dateString}) parsing error`);
        }

        return dateTime.toJSDate();
    }

    fromStringOptional(dateString?: string): Date | undefined
    {
        if (!dateString)
        {
            return undefined;
        }

        return this.fromString(dateString);
    }
}
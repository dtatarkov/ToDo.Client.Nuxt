import { DateTime } from 'luxon';
import { dayInMilliseconds } from '../constants/dateConstants';

export function getTime(date: Date): number
{
    const datetime = DateTime.fromJSDate(date);
    const startOfDay = datetime.startOf('day');
    const diff = datetime.diff(startOfDay, 'milliseconds').milliseconds;

    if (diff < 0 || diff > dayInMilliseconds)
    {
        throw new Error('Time value is out of valid range (0-24 hours)');
    }

    return diff;
}
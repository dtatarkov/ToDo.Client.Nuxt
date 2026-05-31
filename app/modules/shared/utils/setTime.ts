import { DateTime, Duration } from 'luxon';
import { dayInMilliseconds } from '../constants/dateConstants';

export function setTime(date: Date, milliseconds: number): Date
{
    if (milliseconds < 0)
    {
        throw new Error('Milliseconds cannot be negative');
    }

    if (milliseconds > dayInMilliseconds)
    {
        throw new Error('Milliseconds cannot exceed 24 hours');
    }

    const datetime = DateTime.fromJSDate(date);
    const time = Duration.fromMillis(milliseconds);

    const result = datetime.set({
        hour: time.hours,
        minute: time.minutes,
        second: time.seconds,
        millisecond: time.milliseconds
    });

    return result.toJSDate();
}
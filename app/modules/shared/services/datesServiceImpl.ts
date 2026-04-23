import { DateTime, Duration } from 'luxon';
import { DatesService } from '../interfaces/datesService';
import { AppPublicRuntimeConfig } from "../interfaces/appPublicRuntimeConfig";

export class DatesServiceImpl extends DatesService
{
  secondInMilliseconds = 1000;
  minuteInMilliseconds = 60 * this.secondInMilliseconds;
  hourInMilliseconds = 60 * this.minuteInMilliseconds;
  dayInMilliseconds = 24 * this.hourInMilliseconds;

  constructor(private config: AppPublicRuntimeConfig)
  {
    super();
  }

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

    const date = this.fromString(dateString);
    return date;
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

  override setTime(date: Date, milliseconds: number): Date
  {
    // Проверка диапазона миллисекунд
    if (milliseconds < 0)
    {
      throw new Error('Milliseconds cannot be negative');
    }

    if (milliseconds > this.dayInMilliseconds)
    {
      throw new Error('Milliseconds cannot exceed 24 hours');
    }

    // Преобразуем дату в DateTime
    const datetime = DateTime.fromJSDate(date);
    const time = Duration.fromMillis(milliseconds);

    // Устанавливаем новое время
    const result = datetime.set({
      hour: time.hours,
      minute: time.minutes,
      second: time.seconds,
      millisecond: time.milliseconds
    });

    return result.toJSDate();
  }

  getTime(date: Date): number
  {
    // Преобразуем дату в DateTime
    const datetime = DateTime.fromJSDate(date);

    // Находим начало дня
    const startOfDay = datetime.startOf('day');

    // Вычисляем разницу в миллисекундах
    const diff = datetime.diff(startOfDay, 'milliseconds').milliseconds;

    // Проверяем диапазон
    if (diff < 0 || diff > this.dayInMilliseconds)
    {
      throw new Error('Time value is out of valid range (0-24 hours)');
    }

    return diff;
  }

  isDate(value: any): value is Date
  {
    return value instanceof Date;
  }
}

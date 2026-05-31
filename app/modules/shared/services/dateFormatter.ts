export abstract class DateFormatter
{
    abstract formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
    abstract formatDateOptional(date?: Date, options?: Intl.DateTimeFormatOptions): string;
}
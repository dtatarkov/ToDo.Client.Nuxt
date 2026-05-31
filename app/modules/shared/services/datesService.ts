export abstract class DatesService {
  abstract secondInMilliseconds: number;
  abstract minuteInMilliseconds: number;
  abstract hourInMilliseconds: number;
  abstract dayInMilliseconds: number;
  
  abstract fromString(dateString: string): Date;
  abstract fromStringOptional(dateString?: string): Date | undefined;
  abstract formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
  abstract formatDateOptional(date?: Date, options?: Intl.DateTimeFormatOptions): string;
  abstract setTime(date: Date, milliseconds: number): Date;
  abstract getTime(date: Date): number;
  abstract isDate(value?: any): value is Date;
}

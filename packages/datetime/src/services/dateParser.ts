export abstract class DateParser
{
    abstract fromString(dateString: string): Date;
    abstract fromStringOptional(dateString?: string): Date | undefined;
}

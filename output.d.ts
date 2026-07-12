declare module "src/services/dateFormatter" {
    export abstract class DateFormatter {
        abstract formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
        abstract formatDateOptional(date?: Date, options?: Intl.DateTimeFormatOptions): string;
    }
    export abstract class DateFormatterConfiguration {
        abstract locale: string;
    }
}
declare module "src/services/dateParser" {
    export abstract class DateParser {
        abstract fromString(dateString: string): Date;
        abstract fromStringOptional(dateString?: string): Date | undefined;
    }
}
declare module "src/services/dateFormatterImpl" {
    import { DateFormatter, DateFormatterConfiguration } from "src/services/dateFormatter";
    export class DateFormatterImpl extends DateFormatter {
        private config;
        constructor(config: DateFormatterConfiguration);
        formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
        formatDateOptional(date?: Date, options?: Intl.DateTimeFormatOptions): string;
    }
}
declare module "src/services/dateParserImpl" {
    import { DateParser } from "src/services/dateParser";
    export class DateParserImpl extends DateParser {
        fromString(dateString: string): Date;
        fromStringOptional(dateString?: string): Date | undefined;
    }
}
declare module "src/utils/registerDateTimeServices" {
    import type { ServicesContainer } from '@client/di';
    export function registerDateTimeServices(container: ServicesContainer, locale: string): void;
}
declare module "src/index" {
    export { DateFormatter, DateFormatterConfiguration } from "src/services/dateFormatter";
    export { DateParser } from "src/services/dateParser";
    export { registerDateTimeServices } from "src/utils/registerDateTimeServices";
}
declare module "test/unit/dateFormatterImpl.test" { }
declare module "test/unit/dateParserImpl.test" { }

import type { ZonedDateTime } from "@internationalized/date";
import { ValueMapper } from "@client/shared";

export abstract class ZonedDateTimeMapper extends ValueMapper<Date, ZonedDateTime>
{
}
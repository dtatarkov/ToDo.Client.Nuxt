import type { ZonedDateTime } from "@internationalized/date";
import { ValueMapper } from "./valueMapper";

export abstract class ZonedDateTimeMapper extends ValueMapper<Date, ZonedDateTime>
{
}
import type { Time } from "@internationalized/date";
import { ValueMapper } from "@client/shared";

export abstract class TimeMapper extends ValueMapper<number, Time>
{
}
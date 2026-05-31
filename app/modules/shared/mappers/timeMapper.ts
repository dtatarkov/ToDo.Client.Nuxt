import type { Time } from "@internationalized/date";
import { ValueMapper } from "../interfaces/valueMapper";

export abstract class TimeMapper extends ValueMapper<number, Time>
{
}
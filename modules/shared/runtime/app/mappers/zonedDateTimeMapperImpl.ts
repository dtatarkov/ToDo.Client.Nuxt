import { getLocalTimeZone, parseAbsolute, type ZonedDateTime } from "@internationalized/date";

export class ZonedDateTimeMapperImpl extends ZonedDateTimeMapper
{
  map(value: Date): ZonedDateTime
  {
    const timezone = getLocalTimeZone();
    const datetime = parseAbsolute(value.toISOString(), timezone);

    return datetime;
  }

  mapReverse(datetime: ZonedDateTime): Date
  {
    const value = datetime.toDate();

    return value;
  }

}
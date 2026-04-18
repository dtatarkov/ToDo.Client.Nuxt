import { UInputDate } from "#components";
import type { ZonedDateTime } from "@internationalized/date";
import { InputElementBase } from "./inputElementBase";
import type { StringsService } from "@shared/interfaces/stringsService";
import type { ValueMapper } from "@shared/interfaces/valueMapper";
import type { ZonedDateTimeMapper } from "@shared/interfaces/zonedDateTimeMapper";
import { OptionalValueMapper } from '@shared/mappers/optionalValueMapper';

export class InputElementDate extends InputElementBase<Date | undefined> implements InputElementDateData
{
  protected optionalZonedDateTimeMapper: ValueMapper<Date | undefined, ZonedDateTime | undefined>

  readonly component = {
    setup: () =>
    {
      return () => h(UInputDate, this.data);
    }
  }

  constructor(
    zonedDateTimeMapper: ZonedDateTimeMapper,
    stringsService: StringsService,
  )
  {
    super(stringsService);

    this.optionalZonedDateTimeMapper = new OptionalValueMapper(zonedDateTimeMapper);

    Object.assign(this.data, {
      hideTimeZone: true,
      granularity : 'day',
    });
  }

  override get value(): Date | undefined
  {
    const date = this.optionalZonedDateTimeMapper.mapReverse(this.data.modelValue);

    return date;
  }

  override set value(value: Date | undefined)
  {
    this.data.modelValue = this.optionalZonedDateTimeMapper.map(value);
  }
}
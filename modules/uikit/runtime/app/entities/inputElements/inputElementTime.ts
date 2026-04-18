import { UInputTime } from "#components";
import type { Time } from "@internationalized/date";
import { InputElementBase } from "./inputElementBase";
import type { StringsService } from "@shared/interfaces/stringsService";
import type { ValueMapper } from "@shared/interfaces/valueMapper";
import type { TimeMapper } from "@shared/interfaces/timeMapper";
import { OptionalValueMapper } from "@shared/mappers/optionalValueMapper";

export class InputElementTime extends InputElementBase<number | undefined> implements InputElementTimeData
{
  protected optionalTimeMapper: ValueMapper<number | undefined, Time | undefined>

  readonly component = {
    setup: () =>
    {
      return () => h(UInputTime, this.data);
    }
  }

  constructor(
    timeMapper: TimeMapper,
    stringsService: StringsService,
  )
  {
    super(stringsService);

    this.optionalTimeMapper = new OptionalValueMapper(timeMapper);

    Object.assign(this.data, {
      hideTimeZone: true,
      granularity : 'minute',
    });
  }

  override get value(): number | undefined
  {
    const time = this.optionalTimeMapper.mapReverse(this.data.modelValue);

    return time;
  }

  override set value(value: number | undefined)
  {
    this.data.modelValue = this.optionalTimeMapper.map(value);
  }
}

import { InputElementDate } from "./inputElementDate";
import { InputElementComposedBase } from "./internal/InputElementComposedBase";
import type { InputElement } from "../../interfaces/inputElement";
import { DatesService } from '@shared/interfaces/datesService';
import { StringsService } from '@shared/interfaces/stringsService';
import { ZonedDateTimeMapper } from '@shared/interfaces/zonedDateTimeMapper';
import { TimeMapper } from '@shared/interfaces/timeMapper';
import { InputElementTime } from "./inputElementTime";
import { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';

export class InputElementDateTime extends InputElementComposedBase<Date | undefined> implements InputElementDateTimeData
{
  protected children: Record<'inputDate' | 'inputTime', InputElement>

  constructor(
    protected datesService: DatesService,
    stringsService: StringsService,
    protected zonedDateTimeMapper: ZonedDateTimeMapper,
    protected timeMapper: TimeMapper,
    protected vueComponentPropsFactory: VueComponentPropsFactory,
    protected dataAdapterFactory: DataAdapterFactory,
  )
  {
    super(stringsService);

    this.children = {
      inputDate: new InputElementDate(zonedDateTimeMapper, stringsService, vueComponentPropsFactory, dataAdapterFactory),
      inputTime: new InputElementTime(timeMapper, stringsService, vueComponentPropsFactory, dataAdapterFactory),
    }
  }  

  get autofocus(): boolean
  {
    return this.children.inputDate.autofocus;
  }

  set autofocus(value: boolean)
  {
    this.children.inputDate.autofocus = value;
  }

  get value(): Date | undefined
  {
    const date               = this.children.inputDate.value;
    const timeInMilliseconds = this.children.inputTime.value;

    if (!date || !timeInMilliseconds)
    {
      return undefined;
    }

    const result = this.datesService.setTime(date, timeInMilliseconds);

    return result;
  }

  set value(value: Date | undefined)
  {
    if (!value)
    {
      this.children.inputDate.value = undefined;
      this.children.inputTime.value = undefined;
      return;
    }

    const time = this.datesService.getTime(value);
    const date = this.datesService.setTime(value, 0);

    this.children.inputDate.value = date;
    this.children.inputTime.value = time;
  }
}
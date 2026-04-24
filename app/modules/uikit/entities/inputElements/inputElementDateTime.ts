import { InputElementDate } from "./inputElementDate";
import { InputElementComposedBase } from "./base/InputElementComposedBase";
import type { InputElement } from "../../interfaces/inputElement";
import { InputElementTime } from "./inputElementTime";
import type { TimeMapper } from '@/modules/shared/interfaces/timeMapper';
import type { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import type { DatesService } from '@/modules/shared/interfaces/datesService';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import type { ZonedDateTimeMapper } from '@/modules/shared/interfaces/zonedDateTimeMapper';
import type { InputElementDateTimeData } from '../../types/inputElements/InputElementDateTimeData';

export class InputElementDateTime extends InputElementComposedBase<Date | undefined> implements InputElementDateTimeData
{
  protected children: Record<'inputDate' | 'inputTime', InputElement>;

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
    };
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
    const date = this.children.inputDate.value;
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
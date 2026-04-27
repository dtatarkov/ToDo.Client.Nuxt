import { UInputDate } from "#components";
import type { ZonedDateTime } from "@internationalized/date";
import { InputElementNuxtUIBase, type InputElementNuxtUIBaseProps } from "./base/inputElementNuxtUIBase";
import type { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { ValueMapper } from '@/modules/shared/interfaces/valueMapper';
import type { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import type { ZonedDateTimeMapper } from '@/modules/shared/interfaces/zonedDateTimeMapper';
import { OptionalValueMapper } from '@/modules/shared/mappers/optionalValueMapper';
import type { DataAdapterFieldsScheme } from '@/modules/shared/types/dataAdapterFieldsScheme';
import type { VueComponentPropsScheme } from '@/modules/shared/types/vueComponentPropsScheme';
import { mergeDeep } from '@/modules/shared/utils/mergeDeep';
import type { InputElementDateData } from '../../types/inputElements/InputElementDateData';

export type InputElementDateProps = InputElementNuxtUIBaseProps<ZonedDateTime | undefined> & { hideTimeZone: boolean, granularity: 'day'; };

export class InputElementDate extends InputElementNuxtUIBase<Date | undefined, InputElementDateProps, InputElementDateData> implements InputElementDateData
{
  protected optionalZonedDateTimeMapper: ValueMapper<Date | undefined, ZonedDateTime | undefined>;

  readonly component = {
    setup: () =>
    {
      return () => h(UInputDate, this.props);
    }
  };

  constructor(
    zonedDateTimeMapper: ZonedDateTimeMapper,
    stringsService: StringsService,
    vueComponentPropsFactory: VueComponentPropsFactory,
    dataAdapterFactory: DataAdapterFactory,
  )
  {
    super(stringsService, vueComponentPropsFactory, dataAdapterFactory);

    this.optionalZonedDateTimeMapper = new OptionalValueMapper(zonedDateTimeMapper);
  }

  protected override getPropsScheme(): VueComponentPropsScheme<InputElementDateProps>
  {
    return mergeDeep(super.getPropsScheme(), <Partial<VueComponentPropsScheme<InputElementDateProps>>>{
      hideTimeZone: {
        value: true,
      },

      granularity: {
        value: 'day',
      }
    });
  }

  protected override getDataScheme(): DataAdapterFieldsScheme<InputElementDateData, InputElementDateProps>
  {
    return mergeDeep(super.getDataScheme(), <Partial<DataAdapterFieldsScheme<InputElementDateData, InputElementDateProps>>>{
      value: {
        mapper: this.optionalZonedDateTimeMapper,
      }
    });
  }
}
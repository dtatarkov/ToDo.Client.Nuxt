import { UInputTime } from "#components";
import type { Time, ZonedDateTime } from "@internationalized/date";
import { InputViewmodelNuxtUIBase, type InputViewmodelNuxtUIBaseProps } from "./base/inputViewmodelNuxtUIBase";
import type { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { TimeMapper } from '@/modules/shared/interfaces/timeMapper';
import type { ValueMapper } from '@/modules/shared/interfaces/valueMapper';
import type { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import { OptionalValueMapper } from '@/modules/shared/mappers/optionalValueMapper';
import type { DataAdapterFieldsScheme } from '@/modules/shared/types/dataAdapterFieldsScheme';
import type { VueComponentPropsScheme } from '@/modules/shared/types/vueComponentPropsScheme';
import { mergeDeep } from '@/modules/shared/utils/mergeDeep';
import type { InputViewmodelTimeData } from '../../types/inputViewmodels/inputViewmodelTimeData';

export type InputElementTimeProps = InputViewmodelNuxtUIBaseProps<ZonedDateTime | undefined> & { hideTimeZone: boolean, granularity: 'minute'; };

export class InputViewmodelTime extends InputViewmodelNuxtUIBase<number | undefined, InputElementTimeProps, InputViewmodelTimeData>
{
  protected optionalTimeMapper: ValueMapper<number | undefined, Time | undefined>;

  readonly component = {
    setup: () =>
    {
      return () => h(UInputTime, this.props);
    }
  };

  constructor(
    timeMapper: TimeMapper,
    stringsService: StringsService,
    vueComponentPropsFactory: VueComponentPropsFactory,
    dataAdapterFactory: DataAdapterFactory,
  )
  {
    super(stringsService, vueComponentPropsFactory, dataAdapterFactory);

    this.optionalTimeMapper = new OptionalValueMapper(timeMapper);
  }

  protected override getPropsScheme(): VueComponentPropsScheme<InputElementTimeProps>
  {
    return mergeDeep(super.getPropsScheme(), <Partial<VueComponentPropsScheme<InputElementTimeProps>>>{
      hideTimeZone: {
        value: true,
      },

      granularity: {
        value: 'minute',
      }
    });
  }

  protected override getDataScheme(): DataAdapterFieldsScheme<InputViewmodelTimeData, InputElementTimeProps>
  {
    return mergeDeep(super.getDataScheme(), <Partial<DataAdapterFieldsScheme<InputViewmodelTimeData, InputElementTimeProps>>>{
      value: {
        mapper: this.optionalTimeMapper,
      }
    });
  }
}

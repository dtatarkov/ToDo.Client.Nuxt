import { UInputTime } from "#components";
import type { Time, ZonedDateTime } from "@internationalized/date";
import { InputElementNuxtUIBase, type InputElementNuxtUIBaseProps } from "./base/inputElementNuxtUIBase";
import type { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';
import type { StringsService } from '@shared/interfaces/stringsService';
import type { TimeMapper } from '@shared/interfaces/timeMapper';
import type { ValueMapper } from '@shared/interfaces/valueMapper';
import type { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import { OptionalValueMapper } from '@shared/mappers/optionalValueMapper';
import type { DataAdapterFieldsScheme } from '@shared/types/dataAdapterFieldsScheme';
import type { VueComponentPropsScheme } from '@shared/types/vueComponentPropsScheme';
import { mergeDeep } from '@shared/utils/mergeDeep';
import type { InputElementTimeData } from '../../types/inputElements/inputElementTimeData';

export type InputElementTimeProps = InputElementNuxtUIBaseProps<ZonedDateTime | undefined> & { hideTimeZone: boolean, granularity: 'minute'; };

export class InputElementTime extends InputElementNuxtUIBase<number | undefined, InputElementTimeProps, InputElementTimeData>
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

  protected override getDataScheme(): DataAdapterFieldsScheme<InputElementTimeData, InputElementTimeProps>
  {
    return mergeDeep(super.getDataScheme(), <Partial<DataAdapterFieldsScheme<InputElementTimeData, InputElementTimeProps>>>{
      value: {
        mapper: this.optionalTimeMapper,
      }
    });
  }
}

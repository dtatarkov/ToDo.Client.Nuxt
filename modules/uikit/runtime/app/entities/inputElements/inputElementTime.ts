import { UInputTime } from "#components";
import type { Time, ZonedDateTime } from "@internationalized/date";
import { InputElementNuxtUIBase, type InputElementNuxtUIBaseProps } from "./inputElementNuxtUIBase";
import type { StringsService } from "@shared/interfaces/stringsService";
import type { ValueMapper } from "@shared/interfaces/valueMapper";
import type { TimeMapper } from "@shared/interfaces/timeMapper";
import { OptionalValueMapper } from "@shared/mappers/optionalValueMapper";
import { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';

export type InputElementTimeProps = InputElementNuxtUIBaseProps<ZonedDateTime | undefined> & { hideTimeZone: boolean, granularity: string };

export class InputElementTime extends InputElementNuxtUIBase<number | undefined, InputElementTimeProps, InputElementTimeData>
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
    vueComponentPropsFactory: VueComponentPropsFactory,
    dataAdapterFactory: DataAdapterFactory,
  )
  {
    super(stringsService, vueComponentPropsFactory, dataAdapterFactory);

    this.optionalTimeMapper = new OptionalValueMapper(timeMapper);
  }

  protected override getPropsScheme(): VueComponentPropsScheme<InputElementTimeProps> {
      return mergeDeep(super.getPropsScheme(), <Partial<VueComponentPropsScheme<InputElementTimeProps>>>{
        hideTimeZone: {
          value: true,
        },
  
        granularity: {
          value: 'day',
        }
      });
    }
  
    protected override getDataScheme(): DataAdapterFieldsScheme<InputElementTimeData, InputElementTimeProps> {
      return mergeDeep(super.getDataScheme(), <Partial<DataAdapterFieldsScheme<InputElementTimeData, InputElementTimeProps>>>{
        value: {
          mapper: this.optionalTimeMapper,
        }
      });
    }
}

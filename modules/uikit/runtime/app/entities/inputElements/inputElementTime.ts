import { UInputTime } from "#components";
import type { Time, ZonedDateTime } from "@internationalized/date";
import { InputElementNuxtUIBase, type InputElementNuxtUIBaseProps } from "./internal/inputElementNuxtUIBase";

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

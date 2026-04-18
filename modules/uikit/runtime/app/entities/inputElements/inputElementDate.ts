import { UInputDate } from "#components";
import type { ZonedDateTime } from "@internationalized/date";
import { InputElementNuxtUIBase, type InputElementNuxtUIBaseProps } from "./base/inputElementNuxtUIBase";

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
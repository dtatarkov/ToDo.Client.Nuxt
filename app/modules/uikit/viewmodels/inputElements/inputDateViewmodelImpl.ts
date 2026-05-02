import { UInputDate } from "#components";
import type { ZonedDateTime } from "@internationalized/date";
import { InputViewmodelNuxtUIBase, type InputViewmodelNuxtUIBaseProps } from "./base/inputViewmodelNuxtUIBase";
import type { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { ValueMapper } from '@/modules/shared/interfaces/valueMapper';
import type { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import type { ZonedDateTimeMapper } from '@/modules/shared/interfaces/zonedDateTimeMapper';
import { OptionalValueMapper } from '@/modules/shared/mappers/optionalValueMapper';
import type { DataAdapterFieldsScheme } from '@/modules/shared/types/dataAdapterFieldsScheme';
import type { VueComponentPropsScheme } from '@/modules/shared/types/vueComponentPropsScheme';
import { mergeDeep } from '@/modules/shared/utils/mergeDeep';
import type { InputDateViewmodel } from '../../interfaces/inputDateViewmodel';

export type InputElementDateProps = InputViewmodelNuxtUIBaseProps<ZonedDateTime | undefined> & { hideTimeZone: boolean, granularity: 'day'; };

export class InputDateViewmodelImpl extends InputViewmodelNuxtUIBase<Date | undefined, InputElementDateProps, InputDateViewmodel> implements InputDateViewmodel
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

    protected override getDataScheme(): DataAdapterFieldsScheme<InputDateViewmodel, InputElementDateProps>
    {
        return mergeDeep(super.getDataScheme(), <Partial<DataAdapterFieldsScheme<InputDateViewmodel, InputElementDateProps>>>{
            value: {
                mapper: this.optionalZonedDateTimeMapper,
            }
        });
    }
}
import { AppPublicRuntimeConfig } from "../interfaces/appPublicRuntimeConfig";
import { DatesService } from "../interfaces/datesService";
import { StringsService } from "../interfaces/stringsService";
import { DatesServiceImpl } from "../services/datesServiceImpl";
import { StringsServiceImpl } from "../services/stringsServiceImpl";
import { SSRLoaderImpl } from "../services/ssrLoaderImpl";
import { TimeMapperImpl } from "../mappers/internal/timeMapperImpl";
import { ZonedDateTimeMapperImpl } from "../mappers/internal/zonedDateTimeMapperImpl";
import { SSRLoader } from "../interfaces/ssrLoader";
import { ZonedDateTimeMapper } from "../interfaces/zonedDateTimeMapper";
import { TimeMapper } from "../interfaces/timeMapper";
import { VueComponentPropsFactoryImpl } from '../factories/vueComponentPropsFactoryImpl';
import { DataAdapterFactoryImpl } from '../factories/dataAdapterFactoryImpl';
import { VueComponentPropsFactory } from "../interfaces/vueComponentPropsFactory";
import { DataAdapterFactory } from "../interfaces/dataAdapterFactory";
import { useRuntimeConfig } from "#imports";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useSharedServices(): void
{
    useServiceRegistration(AppPublicRuntimeConfig).toDynamicValue(() =>
    {
        const config = useRuntimeConfig();

        return config.public;
    }).asSingleton();

    useServiceRegistration(DatesService).to(DatesServiceImpl).asTransient();
    useServiceRegistration(StringsService).to(StringsServiceImpl).asTransient();
    useServiceRegistration(SSRLoader).to(SSRLoaderImpl).asScoped();
    useServiceRegistration(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    useServiceRegistration(TimeMapper).to(TimeMapperImpl).asTransient();
    useServiceRegistration(VueComponentPropsFactory).to(VueComponentPropsFactoryImpl).asTransient();
    useServiceRegistration(DataAdapterFactory).to(DataAdapterFactoryImpl).asTransient();
}
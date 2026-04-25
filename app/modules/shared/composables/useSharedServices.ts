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
import { registerService } from "@/modules/shared/serviceLocator/serviceLocator";
import { useRuntimeConfig } from "#imports";

export function useSharedServices(): void
{
    registerService(AppPublicRuntimeConfig).toDynamicValue(() =>
    {
        const config = useRuntimeConfig();

        return config.public;
    }).asSingleton();

    registerService(DatesService).to(DatesServiceImpl).asTransient();
    registerService(StringsService).to(StringsServiceImpl).asTransient();
    registerService(SSRLoader).to(SSRLoaderImpl).asScoped();
    registerService(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    registerService(TimeMapper).to(TimeMapperImpl).asTransient();
    registerService(VueComponentPropsFactory).to(VueComponentPropsFactoryImpl).asTransient();
    registerService(DataAdapterFactory).to(DataAdapterFactoryImpl).asTransient();
}
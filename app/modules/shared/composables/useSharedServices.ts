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
import { registerService, registerServiceFactory } from "@/modules/shared/serviceLocator/serviceLocator";
import { useRuntimeConfig } from "#imports";

export function useSharedServices(): void
{
    registerServiceFactory(AppPublicRuntimeConfig, () =>
    {
        const config = useRuntimeConfig();

        return config.public;
    }).asSingleton();

    registerService(DatesService, DatesServiceImpl).asSingleton();
    registerService(StringsService, StringsServiceImpl).asSingleton();
    registerService(SSRLoader, SSRLoaderImpl).asSingleton();
    registerService(ZonedDateTimeMapper, ZonedDateTimeMapperImpl).asScoped();
    registerService(TimeMapper, TimeMapperImpl).asSingleton();
    registerService(VueComponentPropsFactory, VueComponentPropsFactoryImpl).asSingleton();
    registerService(DataAdapterFactory, DataAdapterFactoryImpl).asSingleton();
}
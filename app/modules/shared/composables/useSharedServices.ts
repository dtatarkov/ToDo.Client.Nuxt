import { ServiceScope } from "../enums/serviceScope";
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
import { registerService } from "@/modules/shared/utils/registerService";
import { useRuntimeConfig } from "#imports";
import { registerServiceFactory } from '@/modules/shared/utils/registerServiceFactory';

export function useSharedServices(): void
{
    registerServiceFactory(AppPublicRuntimeConfig, () =>
    {
        const config = useRuntimeConfig();

        return config.public;
    }, ServiceScope.Singleton);

    registerService(DatesService, DatesServiceImpl, ServiceScope.Singleton);
    registerService(StringsService, StringsServiceImpl, ServiceScope.Singleton);
    registerService(SSRLoader, SSRLoaderImpl, ServiceScope.Singleton);
    registerService(ZonedDateTimeMapper, ZonedDateTimeMapperImpl);
    registerService(TimeMapper, TimeMapperImpl, ServiceScope.Singleton);
    registerService(VueComponentPropsFactory, VueComponentPropsFactoryImpl, ServiceScope.Singleton);
    registerService(DataAdapterFactory, DataAdapterFactoryImpl, ServiceScope.Singleton);
}
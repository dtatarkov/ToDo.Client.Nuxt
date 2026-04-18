import { ServiceScope } from "../app/enums/serviceScope";
import { AppPublicRuntimeConfig } from "../app/interfaces/appPublicRuntimeConfig";
import { DatesService } from "../app/interfaces/datesService";
import { StringsService } from "../app/interfaces/stringsService";
import { DatesServiceImpl } from "../app/services/datesServiceImpl";
import { StringsServiceImpl } from "../app/services/stringsServiceImpl";
import { SSRLoaderImpl } from "../app/services/ssrLoaderImpl";
import { TimeMapperImpl } from "../app/mappers/internal/timeMapperImpl";
import { ZonedDateTimeMapperImpl } from "../app/mappers/internal/zonedDateTimeMapperImpl";
import { SSRLoader } from "../app/interfaces/ssrLoader";
import { ZonedDateTimeMapper } from "../app/interfaces/zonedDateTimeMapper";
import { TimeMapper } from "../app/interfaces/timeMapper";
import { VueComponentPropsFactoryImpl } from '../app/factories/vueComponentPropsFactoryImpl';
import { DataAdapterFactoryImpl } from '../app/factories/dataAdapterFactoryImpl';

export default defineNuxtPlugin(() =>
{
  registerServiceFactory(AppPublicRuntimeConfig, () =>
  {
    const config = useRuntimeConfig();

    return config.public;
  }, ServiceScope.Singleton);

  registerServiceFactory(DatesService, () =>
  {
    const config = getService(AppPublicRuntimeConfig);
    const result = new DatesServiceImpl(config);

    return result;
  }, ServiceScope.Singleton);

  registerService(StringsService, StringsServiceImpl, ServiceScope.Singleton);
  registerService(SSRLoader, SSRLoaderImpl, ServiceScope.Singleton);

  registerService(ZonedDateTimeMapper, ZonedDateTimeMapperImpl);

  registerServiceFactory(TimeMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper = new TimeMapperImpl(datesService);

    return mapper;
  }, ServiceScope.Singleton);

  registerServiceFactory(VueComponentPropsFactory, () =>
  {
    const result = new VueComponentPropsFactoryImpl();

    return result;
  }, ServiceScope.Singleton);

  registerServiceFactory(DataAdapterFactory, () =>
  {
    const result = new DataAdapterFactoryImpl();

    return result;
  }, ServiceScope.Singleton);
});
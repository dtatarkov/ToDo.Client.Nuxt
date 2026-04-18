import { FormElementFactory } from "../app/interfaces/internal/formElementFactory";
import { FormFactory } from "../app/interfaces/formFactory";
import { FormElementFactoryImpl } from "../app/factories/formElementFactoryImpl";
import { FormFactoryImpl } from "../app/factories/formFactoryImpl";
import { DatesService } from "@shared/interfaces/datesService";
import { StringsService } from "@shared/interfaces/stringsService";
import { ZonedDateTimeMapper } from "@shared/interfaces/zonedDateTimeMapper";
import { TimeMapper } from "@shared/interfaces/timeMapper";
import { ServiceScope } from "@shared/enums/serviceScope";
import { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';

export default defineNuxtPlugin(() =>
{
  registerServiceFactory(FormElementFactory, () =>
  {
    const datesService              = getService(DatesService);
    const stringsService            = getService(StringsService);
    const zonedDateTimeMapper       = getService(ZonedDateTimeMapper);
    const timeMapper                = getService(TimeMapper);
    const vueComponentPropsFactory  = getService(VueComponentPropsFactory);
    const dataAdapterFactory        = getService(DataAdapterFactory);

    const result = new FormElementFactoryImpl(datesService, stringsService, zonedDateTimeMapper, timeMapper, vueComponentPropsFactory, dataAdapterFactory);

    return result;
  }, ServiceScope.Singleton);

  registerServiceFactory(FormFactory, () =>
  {
    const formElementFactory = getService(FormElementFactory);
    const formFactory        = new FormFactoryImpl(formElementFactory);

    return formFactory;
  }, ServiceScope.Singleton);
})
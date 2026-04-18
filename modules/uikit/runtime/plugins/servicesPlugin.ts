import { UIKitElementsFactory } from "../app/interfaces/uiKitElementsFactory";
import { UIKitElementsFactoryImpl } from "../app/factories/uiKitElementsFactoryImpl";

export default defineNuxtPlugin(() =>
{
    registerServiceFactory(UIKitElementsFactory, () =>
    {
        const stringsService = getService(StringsService);
        const vueComponentPropsFactory = getService(VueComponentPropsFactory);
        const dataAdapterFactory = getService(DataAdapterFactory);
        const zonedDateTimeMapper = getService(ZonedDateTimeMapper);
        const timeMapper = getService(TimeMapper);
        const datesService = getService(DatesService);

        const result = new UIKitElementsFactoryImpl(
            stringsService,
            vueComponentPropsFactory,
            dataAdapterFactory,
            zonedDateTimeMapper,
            timeMapper,
            datesService,
        );

        return result;
    }, ServiceScope.Singleton);
});
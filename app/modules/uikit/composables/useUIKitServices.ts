import { UIKitElementsFactory } from "../interfaces/uiKitElementsFactory";
import { UIKitElementsFactoryImpl } from "../factories/uiKitElementsFactoryImpl";
import { StringsService } from "@/modules/shared/interfaces/stringsService";
import { VueComponentPropsFactory } from "@/modules/shared/interfaces/vueComponentPropsFactory";
import { DataAdapterFactory } from "@/modules/shared/interfaces/dataAdapterFactory";
import { ZonedDateTimeMapper } from "@/modules/shared/interfaces/zonedDateTimeMapper";
import { TimeMapper } from "@/modules/shared/interfaces/timeMapper";
import { DatesService } from "@/modules/shared/interfaces/datesService";
import { ServiceScope } from "@/modules/shared/enums/serviceScope";
import { registerServiceFactory } from "@/modules/shared/utils/registerServiceFactory";
import { getService } from "@/modules/shared/utils/getService";

export function useUIKitServices(): void
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
}
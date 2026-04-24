import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import { FormFactory } from "../interfaces/formFactory";
import { FormElementFactoryImpl } from "../factories/formElementFactoryImpl";
import { FormFactoryImpl } from "../factories/formFactoryImpl";
import { UIKitElementsFactory } from "@/modules/uikit/interfaces/uiKitElementsFactory";
import { ServiceScope } from "@/modules/shared/enums/serviceScope";
import { registerServiceFactory } from "@/modules/shared/utils/registerServiceFactory";
import { getService } from "@/modules/shared/utils/getService";

export function useFormsServices(): void
{
    registerServiceFactory(FormElementFactory, () =>
    {
        const uiKitElementsFactory = getService(UIKitElementsFactory);
        const result = new FormElementFactoryImpl(uiKitElementsFactory);

        return result;
    }, ServiceScope.Singleton);

    registerServiceFactory(FormFactory, () =>
    {
        const formElementFactory = getService(FormElementFactory);
        const formFactory = new FormFactoryImpl(formElementFactory);

        return formFactory;
    }, ServiceScope.Singleton);
}
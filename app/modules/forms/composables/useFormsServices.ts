import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import { FormFactory } from "../interfaces/formFactory";
import { FormElementFactoryImpl } from "../factories/formElementFactoryImpl";
import { FormFactoryImpl } from "../factories/formFactoryImpl";
import { registerService } from "@/modules/shared/serviceLocator/serviceLocator";

export function useFormsServices(): void
{
    registerService(FormElementFactory, FormElementFactoryImpl).asSingleton();
    registerService(FormFactory, FormFactoryImpl).asSingleton();
}
import { UIKitElementsFactory } from "../interfaces/uiKitElementsFactory";
import { UIKitElementsFactoryImpl } from "../factories/uiKitElementsFactoryImpl";
import { registerService } from "@/modules/shared/serviceLocator/serviceLocator";

export function useUIKitServices(): void
{
    registerService(UIKitElementsFactory, UIKitElementsFactoryImpl).asTransient();
}
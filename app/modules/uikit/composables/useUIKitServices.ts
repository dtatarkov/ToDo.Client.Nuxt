import { UIKitElementsFactory } from "../interfaces/uiKitElementsFactory";
import { UIKitElementsFactoryImpl } from "../factories/uiKitElementsFactoryImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useUIKitServices(): void
{
    useServiceRegistration(UIKitElementsFactory).to(UIKitElementsFactoryImpl).asTransient();
}
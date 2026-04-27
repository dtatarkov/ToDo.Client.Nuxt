import { UIKitViewmodelsFactory } from "../interfaces/uikitViewmodelsFactory";
import { UIKitViewmodelFactoryImpl } from "../factories/uikitViewmodelFactoryImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useUIKitServices(): void
{
    useServiceRegistration(UIKitViewmodelsFactory).to(UIKitViewmodelFactoryImpl).asTransient();
}
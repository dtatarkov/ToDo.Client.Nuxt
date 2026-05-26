import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { ButtonsFactory } from '../factories/buttonsFactory';
import { ButtonsFactoryImpl } from '../factories/buttonsFactoryImpl';

export function useUIKitServices(): void
{
    useServiceRegistration(ButtonsFactory).to(ButtonsFactoryImpl).asTransient();
}
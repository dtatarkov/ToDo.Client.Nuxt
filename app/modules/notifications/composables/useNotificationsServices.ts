import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { AppNotificationsStore } from '../entities/appNotificationsStore';
import { AppNotificationsStoreBase } from '../entities/appNotificationsStoreBase';

export function useNotificationsServices(): void
{
    useServiceRegistration(AppNotificationsStore).to(AppNotificationsStoreBase).asSingleton();
}
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { NotificationsStore } from '../entities/notificationsStore';
import { NotificationsStoreBase } from '../entities/notificationsStoreBase';

export function useNotificationsServices(): void
{
    useServiceRegistration(NotificationsStore).to(NotificationsStoreBase).asSingleton();
}
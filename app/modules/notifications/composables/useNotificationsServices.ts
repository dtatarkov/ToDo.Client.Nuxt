import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { Notifier } from '../entities/notifier';
import { NotifierBase } from '../entities/notifierBase';

export function useNotificationsServices(): void
{
    useServiceRegistration(Notifier).to(NotifierBase).asSingleton();
}
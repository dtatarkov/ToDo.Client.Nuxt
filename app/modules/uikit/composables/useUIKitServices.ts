import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { ButtonsFactory } from '../factories/buttonsFactory';
import { ButtonsFactoryImpl } from '../factories/buttonsFactoryImpl';
import { NotificationsTimelineBase } from '../entities/notificationsTimelineBase';
import { NotificationsTimeline } from '../entities/notificationsTimeline';

export function useUIKitServices(): void
{
    useServiceRegistration(ButtonsFactory).to(ButtonsFactoryImpl).asTransient();
    useServiceRegistration(NotificationsTimeline).to(NotificationsTimelineBase).asSingleton();
}
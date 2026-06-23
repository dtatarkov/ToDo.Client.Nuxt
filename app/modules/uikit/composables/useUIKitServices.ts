import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { ButtonsFactory } from '../factories/buttonsFactory';
import { ButtonsFactoryImpl } from '../factories/buttonsFactoryImpl';
import { TimelineBase } from '@/modules/notifications/entities/timelineBase';
import { Timeline } from '@/modules/notifications/entities/timeline';

export function useUIKitServices(): void
{
    useServiceRegistration(ButtonsFactory).to(ButtonsFactoryImpl).asTransient();
    useServiceRegistration(Timeline).to(TimelineBase).asSingleton();
}
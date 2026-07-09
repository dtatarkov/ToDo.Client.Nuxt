import type { ServicesContainer } from '@client/di';
import { ButtonsFactory } from '../factories/buttonsFactory';
import { ButtonsFactoryImpl } from '../factories/buttonsFactoryImpl';
import { TimelineBase } from '@/modules/notifications/entities/timelineBase';
import { Timeline } from '@/modules/notifications/entities/timeline';

export function registerUIKitServices(container: ServicesContainer): void
{
    container.bind(ButtonsFactory).to(ButtonsFactoryImpl).asTransient();
    container.bind(Timeline).to(TimelineBase).asSingleton();
}

import type { ServicesContainer } from '@client/di';
import { AppNotificationsStore } from '../entities/appNotificationsStore';
import { AppNotificationsStoreBase } from '../entities/appNotificationsStoreBase';

export function registerNotificationsServices(container: ServicesContainer): void
{
    container.bind(AppNotificationsStore).to(AppNotificationsStoreBase).asSingleton();
}

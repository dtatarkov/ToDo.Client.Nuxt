import type { ServicesContainer } from '@packages/di';
import { Sidebar } from '../entities/sidebar';
import { SidebarBase } from '../entities/sidebarBase';

export function registerSidebarServices(container: ServicesContainer): void
{
    container.bind(Sidebar).to(SidebarBase).asSingleton();
}

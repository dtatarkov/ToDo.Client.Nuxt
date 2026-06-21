import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { Sidebar } from '../entities/sidebar';
import { SidebarBase } from '../entities/sidebarBase';

export function useSidebarServices(): void
{
    useServiceRegistration(Sidebar).to(SidebarBase).asSingleton();
}
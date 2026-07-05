import { registerSharedServices } from '../utils/registerSharedServices';
import { useServicesContainer } from '@/composables/useServicesContainer';

export function useStorybookSharedServices(): void
{
    const container = useServicesContainer();
    registerSharedServices(container);
}

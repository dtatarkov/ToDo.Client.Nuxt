import { registerSharedServices } from '@/modules/shared/utils/registerSharedServices';

export function useStorybookSharedServices(): void
{
    const container = useServicesContainer();
    registerSharedServices(container);
}

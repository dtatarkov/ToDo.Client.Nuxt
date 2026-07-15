import { registerDateTimeServices } from '@client/datetime';
import { LoggingService, LoggingServiceImpl } from '@client/shared';
import { useServicesContainer } from '@/composables/useServicesContainer';

export function useStorybookServices(): void
{
    const container = useServicesContainer();
    const config = useRuntimeConfig();

    // Register shared services
    container.bind(LoggingService).to(LoggingServiceImpl).asSingleton();

    // Register datetime services
    registerDateTimeServices(container, config.public.locale);
}

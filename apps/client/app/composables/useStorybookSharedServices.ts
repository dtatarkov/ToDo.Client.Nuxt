import { registerDateTimeServices } from '@client/datetime';

export function useStorybookServices(): void
{
    const container = useServicesContainer();
    const config = useRuntimeConfig();

    registerDateTimeServices(container, config.public.locale);
}

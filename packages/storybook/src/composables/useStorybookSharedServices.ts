import { registerSharedServices } from '@packages/shared';
import { useRuntimeConfig, useI18n } from '#imports';

export function useStorybookSharedServices(): void
{
    const container = useServicesContainer();
    const { t } = useI18n();
    const config = useRuntimeConfig();

    registerSharedServices(container, t);
}

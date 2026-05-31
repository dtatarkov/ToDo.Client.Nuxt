import { AppPublicRuntimeConfig } from "../interfaces/appPublicRuntimeConfig";
import { DatesService } from "../services/datesService";
import { DatesServiceImpl } from "../services/datesServiceImpl";
import { TimeMapperImpl } from "../mappers/timeMapperImpl";
import { ZonedDateTimeMapperImpl } from "../mappers/zonedDateTimeMapperImpl";
import { ZonedDateTimeMapper } from "../mappers/zonedDateTimeMapper";
import { TimeMapper } from "../mappers/timeMapper";
import { useRuntimeConfig } from "#imports";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useSharedServices(): void
{
    useServiceRegistration(AppPublicRuntimeConfig).toDynamicValue(() =>
    {
        const config = useRuntimeConfig();

        return config.public;
    }).asSingleton();

    useServiceRegistration(DatesService).to(DatesServiceImpl).asTransient();
    useServiceRegistration(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    useServiceRegistration(TimeMapper).to(TimeMapperImpl).asTransient();
}
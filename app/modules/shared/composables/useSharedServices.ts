import { AppPublicRuntimeConfig } from "../interfaces/appPublicRuntimeConfig";
import { DatesService } from "../interfaces/datesService";
import { DatesServiceImpl } from "../services/datesServiceImpl";
import { TimeMapperImpl } from "../mappers/internal/timeMapperImpl";
import { ZonedDateTimeMapperImpl } from "../mappers/internal/zonedDateTimeMapperImpl";
import { ZonedDateTimeMapper } from "../interfaces/zonedDateTimeMapper";
import { TimeMapper } from "../interfaces/timeMapper";
import { EffectsContainer } from '../interfaces/effectsContainer';
import { EffectsContainerImpl } from '../entities/effectsContainerImpl';
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
    useServiceRegistration(EffectsContainer).to(EffectsContainerImpl).asTransient();
}
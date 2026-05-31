import { AppPublicRuntimeConfig } from "../interfaces/appPublicRuntimeConfig";
import { DateParser } from "../services/dateParser";
import { DateParserImpl } from "../services/dateParserImpl";
import { DateFormatter } from "../services/dateFormatter";
import { DateFormatterImpl } from "../services/dateFormatterImpl";
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

    useServiceRegistration(DateParser).to(DateParserImpl).asTransient();
    useServiceRegistration(DateFormatter).to(DateFormatterImpl).asTransient();
    useServiceRegistration(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    useServiceRegistration(TimeMapper).to(TimeMapperImpl).asTransient();
}
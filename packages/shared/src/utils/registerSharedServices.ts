import type { ServicesContainer } from '@packages/di';
import { TimeMapperImpl } from '../mappers/timeMapperImpl';
import { ZonedDateTimeMapperImpl } from '../mappers/zonedDateTimeMapperImpl';
import { ZonedDateTimeMapper } from '../mappers/zonedDateTimeMapper';
import { TimeMapper } from '../mappers/timeMapper';
import { DisposeToken } from '../entities/disposeToken';
import { MessagesService } from '../services/messagesService';
import { MessagesServiceImpl } from '../services/messagesServiceImpl';
import { LoggingService } from '../services/loggingService';
import { LoggingServiceImpl } from '../services/loggingServiceImpl';
import type { Func } from '../types/func';

export function registerSharedServices(
    container: ServicesContainer,
    t: Func<string, [key: string, params?: Record<string, string | number>]>,
): void
{
    container.bind(DisposeToken).to(DisposeToken).asTransient();
    container.bind(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    container.bind(TimeMapper).to(TimeMapperImpl).asTransient();
    container.bind(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    container.bind(LoggingService).to(LoggingServiceImpl).asSingleton();
}

import type { ServicesContainer } from '@client/infrastructure-di';
import { LoggingService } from '../services/loggingService';
import { LoggingServiceImpl } from '../services/loggingServiceImpl';

export function registerLoggingServices(container: ServicesContainer): void
{
    container.bind(LoggingService).to(LoggingServiceImpl).asSingleton();
}

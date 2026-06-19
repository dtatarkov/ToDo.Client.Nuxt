import { Logger } from 'tslog';
import { LoggingService } from './loggingService';

export class LoggingServiceImpl extends LoggingService
{
    private logger = new Logger({ name: 'App' });

    override logError(error: unknown): void
    {
        this.logger.error(error);
    }
}
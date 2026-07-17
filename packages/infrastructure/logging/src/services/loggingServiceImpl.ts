import { Logger, type ILogObjMeta, type IMeta } from 'tslog';
import { LoggingService } from './loggingService';
import { isString } from '@client/shared';
import type { Action } from '@client/shared';

export class LoggingServiceImpl extends LoggingService
{
    private logger = this.createLogger();

    override logError(error: unknown): void
    {
        this.logger.error(error);
    }

    private createLogger(): Logger<unknown>
    {
        const logger = new Logger({
            name: 'App',
            type: 'hidden',
        });

        LogTransportConsole.attachTo(logger);

        return logger;
    }
}

type LogJsonBase = {
    type?: string,
    date?: Date,
    message?: IMeta,
    stack?: IMeta,
};

type LogJsonFull = LogJsonBase & Record<string, any>;

class LogTransportConsole
{
    static instance = new LogTransportConsole();

    static attachTo<T>(logger: Logger<T>)
    {
        logger.attachTransport((logObj) => LogTransportConsole.instance.log(logObj));
    }

    log(logObj: ILogObjMeta)
    {
        const json = this.createJson(logObj);
        const logFn = this.getLogFn(json.type);

        logFn(json.message, json);
    }

    private getLogFn(type: string | undefined): Action<[IMeta | undefined, LogJsonFull]>
    {
        switch (type)
        {
            case "WARN":
                return console.warn.bind(console);
            case "ERROR":
            case "FATAL":
                return console.error.bind(console);
            case "INFO":
                return console.info.bind(console);
            case "DEBUG":
            case "TRACE":
            case "SILLY":
            default:
                return console.log.bind(console);
        }
    }

    private createJson(logObj: ILogObjMeta): LogJsonFull
    {
        const json: LogJsonFull = {
            type: logObj._meta?.logLevelName,
            date: logObj._meta?.date,
            message: logObj.message,
            stack: logObj.stack,
        };

        const error = logObj.nativeError;

        if (error instanceof Error)
        {
            for (const key of Reflect.ownKeys(error))
            {
                if (key === 'stack' || key === 'message')
                    continue;

                if (!isString(key))
                    continue;

                json[key] = error[key as keyof Error];
            }
        }

        return json;
    }
}

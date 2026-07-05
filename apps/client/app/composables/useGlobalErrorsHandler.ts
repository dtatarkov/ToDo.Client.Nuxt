import { LoggingService } from '@/modules/shared/services/loggingService';

export function useGlobalErrorsHandler()
{
    const loggingService = useService(LoggingService);
    const nuxtApp = useNuxtApp();

    nuxtApp.vueApp.config.errorHandler = (error, _instance, _info) =>
    {
        loggingService.logError(error);
    };

    if (import.meta.client)
    {
        window.addEventListener('unhandledrejection', (event) =>
        {
            event.preventDefault();

            loggingService.logError(event.reason);
        });
    }
}
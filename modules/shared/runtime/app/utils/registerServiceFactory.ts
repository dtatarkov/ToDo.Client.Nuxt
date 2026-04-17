import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { ServiceScope } from "../enums/serviceScope";

export function registerServiceFactory<T>(serviceIdentifier: ServiceIdentifier<T>, factory: () => T, scope?: ServiceScope): void
{
  const serviceLocator = useServiceLocator();
  serviceLocator.registerFactory(serviceIdentifier, factory, scope);
}
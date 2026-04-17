import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { Constructor } from "../types/constructor";
import type { ServiceScope } from "../enums/serviceScope";

export function registerService<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>, scope?: ServiceScope): void
{
  const serviceLocator = useServiceLocator();
  serviceLocator.register(serviceIdentifier, service, scope);
}
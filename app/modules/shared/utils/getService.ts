import { useServiceLocator } from '../composables/useServiceLocator';
import type { ServiceIdentifier } from "../types/serviceIdentifier";

export function getService<T>(serviceIdentifier: ServiceIdentifier<T>): T
{
  const serviceLocator = useServiceLocator();
  const service = serviceLocator.get(serviceIdentifier);

  return service;
}
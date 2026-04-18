import { ServiceLocator } from "../interfaces/internal/serviceLocator";

export function useServiceLocator()
{
  const app = useNuxtApp();
  const serviceLocator = app[`$${ServiceLocator.name}`] as ServiceLocator;

  return serviceLocator;
}
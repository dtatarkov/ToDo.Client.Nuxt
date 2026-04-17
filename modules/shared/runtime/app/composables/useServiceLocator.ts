import { ServiceLocator } from "../interfaces/serviceLocator";

export function useServiceLocator()
{
  const app            = useNuxtApp();
  const serviceLocator = app[`$${ ServiceLocator.name }`] as ServiceLocator;

  return serviceLocator;
}
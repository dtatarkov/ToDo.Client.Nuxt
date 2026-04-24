import { ServiceLocator } from "../interfaces/internal/serviceLocator";
import { ServiceLocatorBase } from "../entities/internal/serviceLocatorBase";
import { useNuxtApp } from "#imports";

export function useServiceLocator(): ServiceLocator
{
  const nuxtApp = useNuxtApp();
  const key = `$${ServiceLocator.name}`;

  if (!nuxtApp[key])
  {
    nuxtApp[key] = new ServiceLocatorBase();
  }

  const serviceLocator = nuxtApp[key] as ServiceLocator;

  return serviceLocator;
}
import { ServiceLocator } from "../app/interfaces/internal/serviceLocator";
import { ServiceLocatorBase } from "../app/entities/internal/serviceLocatorBase";

export default defineNuxtPlugin((nuxtApp) =>
{
  nuxtApp.provide(ServiceLocator.name, new ServiceLocatorBase());
});
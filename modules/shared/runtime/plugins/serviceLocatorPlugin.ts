import { ServiceLocator } from "../app/interfaces/serviceLocator";
import { ServiceLocatorBase } from "../app/entities/serviceLocatorBase";

export default defineNuxtPlugin((nuxtApp) =>
{
  nuxtApp.provide(ServiceLocator.name, new ServiceLocatorBase());
})
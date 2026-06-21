import type { SharedPublicRuntimeConfig } from "#build/types/runtime-config";

export abstract class AppPublicRuntimeConfig implements Omit<SharedPublicRuntimeConfig, 'i18n'>
{
  abstract appTitle: string;
  abstract apiBaseUrl: string;
  abstract locale: string;
  abstract longTaskSpinnerDelay: number;
  abstract validatorsCacheSizeMax: number;
}
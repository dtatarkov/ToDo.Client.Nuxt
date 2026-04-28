import type { SharedPublicRuntimeConfig } from "#build/types/runtime-config";

export abstract class AppPublicRuntimeConfig implements SharedPublicRuntimeConfig
{
  abstract apiBaseUrl: string;
  abstract locale: string;
  abstract longTaskSpinnerDelay: number;
} 
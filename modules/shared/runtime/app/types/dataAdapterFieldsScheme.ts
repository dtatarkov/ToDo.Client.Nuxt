import type { DataAdapterFieldScheme } from "./dataAdapterFieldScheme";

export type DataAdapterFieldsScheme<Data extends Record<string, any> = Record<string, any>> = Record<string, DataAdapterFieldScheme<Data>>;

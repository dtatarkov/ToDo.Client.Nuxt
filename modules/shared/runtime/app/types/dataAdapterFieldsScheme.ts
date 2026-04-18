import type { DataAdapterFieldScheme } from "./dataAdapterFieldScheme";

export type DataAdapterFieldsScheme<Data extends Record<string, any>, Source extends Record<string, any>> = {
 [K in keyof Data]: DataAdapterFieldScheme<Source, keyof Source>;
}

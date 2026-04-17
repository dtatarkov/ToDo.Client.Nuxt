import type { DataAdapterFieldsScheme } from "../types/dataAdapterFieldsScheme";
import type { ValueMapper } from "./valueMapper";

export type DataAdapterFactoryResult<Data extends Record<string, any>, S extends DataAdapterFieldsScheme<Data>> = {
    [K in keyof S]: S[K] extends { mapper: ValueMapper<any, infer O> } 
        ? O 
        : S[K] extends { from: infer From } 
            ? From extends keyof Data 
                ? Data[From] 
                : never
            : K extends keyof Data 
                ? Data[K] 
                : never;
};

export abstract class DataAdapterFactory
{
  abstract createAdapter<Data extends Record<string, any>, S extends DataAdapterFieldsScheme<Data>>(data: Data, scheme: S): DataAdapterFactoryResult<Data, S>;
}

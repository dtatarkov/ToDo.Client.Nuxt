import type { DataAdapterFieldsScheme } from '../types/dataAdapterFieldsScheme';

export abstract class DataAdapterFactory
{
  abstract create<Data extends Record<string, any>, Source extends Record<string, any>>(data: Source, scheme: DataAdapterFieldsScheme<Data, Source>): Data;
}

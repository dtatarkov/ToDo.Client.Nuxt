import { DataAdapterFactory } from "../interfaces/dataAdapterFactory";
import type { DataAdapterFieldsScheme } from '../types/dataAdapterFieldsScheme';

export class DataAdapterFactoryImpl extends DataAdapterFactory
{
    create<Data extends Record<string, any>, Source extends Record<string, any>>(data: Source, scheme: DataAdapterFieldsScheme<Data, Source>): Data 
    {
        const adaptedData: Record<string, any> = {};

        for (const [fieldName, { from, mapper }] of Object.entries(scheme))
        {
            const sourceFieldName = (from || fieldName) as string;

            Object.defineProperty(adaptedData, fieldName, {
                get: () =>
                {
                    const sourceValue = data[sourceFieldName as keyof Source];
                    const adaptedValue = mapper ? mapper.mapReverse(sourceValue) : sourceValue;

                    return adaptedValue;
                },

                set: (value) =>
                {
                    const sourceValue = mapper ? mapper.map(value) : value;
                    data[sourceFieldName as keyof Source] = sourceValue;
                },

                enumerable: true,
            });
        }

        return adaptedData as Data;
    }
}
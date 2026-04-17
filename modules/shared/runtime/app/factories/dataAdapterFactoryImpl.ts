import { DataAdapterFactory, type DataAdapterFactoryResult } from "../interfaces/dataAdapterFactory";
import type { DataAdapterFieldsScheme } from "../types/dataAdapterFieldsScheme";

export class DataAdapterFactoryImpl extends DataAdapterFactory {
    createAdapter<Data extends Record<string, any>, S extends DataAdapterFieldsScheme<Data>>(data: Data, scheme: S): DataAdapterFactoryResult<Data, S> {
        const adaptedData: Record<string, any> = {};

        for (const [fieldName, { from, mapper }] of Object.entries(scheme)) {
            const sourceFieldName = (from || fieldName) as string;

            Object.defineProperty(adaptedData, fieldName, {
                get: () => {
                    const sourceValue = data[sourceFieldName as keyof Data];
                    const adaptedValue = mapper ? mapper.map(sourceValue) : sourceValue;

                    return adaptedValue;
                },

                set: (value) => {
                    const sourceValue = mapper ? mapper.mapReverse(value) : value;
                    data[sourceFieldName as keyof Data] = sourceValue;
                },

                enumerable: true,
            });
        }

        return adaptedData as DataAdapterFactoryResult<Data, S>;
    }
}
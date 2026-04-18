import { DataAdapterFactory } from "../interfaces/dataAdapterFactory";

export class DataAdapterFactoryImpl extends DataAdapterFactory {
    create<Data extends Record<string, any>, Source extends Record<string, any>>(data: Source, scheme: DataAdapterFieldsScheme<Data, Source>): Data 
    {
        const adaptedData: Record<string, any> = {};

        for (const [fieldName, { from, mapper }] of Object.entries(scheme)) {
            const sourceFieldName = (from || fieldName) as string;

            Object.defineProperty(adaptedData, fieldName, {
                get: () => {
                    const sourceValue = data[sourceFieldName as keyof Source];
                    const adaptedValue = mapper ? mapper.map(sourceValue) : sourceValue;

                    return adaptedValue;
                },

                set: (value) => {
                    const sourceValue = mapper ? mapper.mapReverse(value) : value;
                    data[sourceFieldName as keyof Source] = sourceValue;
                },

                enumerable: true,
            });
        }

        return adaptedData as Data;
    }
}
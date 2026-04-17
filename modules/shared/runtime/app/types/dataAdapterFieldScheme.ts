import type { ValueMapper } from "../interfaces/valueMapper";

export type DataAdapterFieldScheme<Data = Record<string, any>, From extends keyof Data = keyof Data, O = any> = {
    from?: From;
    mapper?: ValueMapper<Data[From], O>;
};

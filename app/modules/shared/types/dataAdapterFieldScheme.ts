import type { ValueMapper } from "../interfaces/valueMapper";

export type DataAdapterFieldScheme<Data = Record<string, any>, From extends keyof Data = keyof Data, O = Data[From]> = {
    from?: From;
    mapper?: ValueMapper<Data[From], O>;
};

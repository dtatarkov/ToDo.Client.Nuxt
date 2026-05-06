import type { ReactiveField } from '@/modules/shared/interfaces/reactiveField';
import { Viewmodel } from './viewmodel';
import type { ValueOrGetter } from '@/modules/shared/types/valueOrGetter';


export type InfoRowData = {
    label: ValueOrGetter<string>;
    content: ValueOrGetter<string>;
};

export abstract class InfoRowViewmodel extends Viewmodel<string>
{
    abstract readonly label: ReactiveField<string>;
    abstract readonly content: ReactiveField<string>;
    abstract readonly isEmpty: boolean;

    abstract setData(data: Partial<InfoRowData>): void;
}
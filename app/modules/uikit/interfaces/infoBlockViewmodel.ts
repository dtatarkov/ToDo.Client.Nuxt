import type { InfoRowViewmodel, InfoRowData } from './infoRowViewmodel';
import { Viewmodel } from './viewmodel';

export abstract class InfoBlockViewmodel extends Viewmodel<string>
{
    abstract get rows(): InfoRowViewmodel[];
    abstract readonly isEmpty: boolean;

    abstract createRow(data?: Partial<InfoRowData>): InfoRowViewmodel;
    abstract clear(): void;
}
import type { InfoRowViewmodel, InfoRowData } from './infoRowViewmodel';
import { Viewmodel } from './viewmodel';

export abstract class InfoBlockViewmodel extends Viewmodel<string>
{
    abstract get rows(): InfoRowViewmodel[];

    abstract createRow(data?: Partial<InfoRowData>): InfoRowViewmodel;
}
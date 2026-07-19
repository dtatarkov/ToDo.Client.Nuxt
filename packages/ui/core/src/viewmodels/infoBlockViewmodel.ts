import { Viewmodel } from './viewmodel';

export type InfoBlockViewmodelState = {
    rows: InfoBlockViewmodelStateRow[];
    hasRows: boolean;
};

export type InfoBlockViewmodelStateRow = {
    labelKey: string;
    content: string;
};

export abstract class InfoBlockViewmodel extends Viewmodel<InfoBlockViewmodelState>
{
    abstract addRow(label: string, content: string): void;
    abstract clear(): void;
}

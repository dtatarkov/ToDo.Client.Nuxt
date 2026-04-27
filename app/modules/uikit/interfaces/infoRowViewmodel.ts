import { Viewmodel } from './viewmodel';


export type InfoRowData = {
    label: string;
    content: string;
};

export abstract class InfoRowViewmodel extends Viewmodel<string> implements InfoRowData
{
    abstract label: string;
    abstract content: string;
}
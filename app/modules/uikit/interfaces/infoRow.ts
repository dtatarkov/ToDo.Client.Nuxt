import { UIElement } from './uiElement';


export type InfoRowData = {
    label: string;
    content: string;
};

export abstract class InfoRow extends UIElement<string> implements InfoRowData
{
    abstract label: string;
    abstract content: string;
}
import { UIElement } from './uiElement';

export abstract class InfoRow extends UIElement<string>
{
    abstract label: string;
    abstract content: string;
}
import type { InfoRow, InfoRowData } from './infoRow';
import { UIElement } from './uiElement';

export abstract class InfoBlock extends UIElement<string>
{
    abstract get rows(): InfoRow[];

    abstract createRow(data?: Partial<InfoRowData>): InfoRow;
}
import type { ButtonElementGeneral, ButtonElementGeneralData } from './buttonElementGeneral';
import type { InputElement } from './inputElement';
import type { Grid } from './grid';
import type { UIElement } from './uiElement';
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { InfoBlock } from './infoBlock';
import type { ButtonElementIcon, ButtonElementIconData } from './buttonElementIcon';

export abstract class UIKitElementsFactory
{
    abstract createInputText(): InputElement<string>;
    abstract createTextarea(): InputElement<string>;
    abstract createInputDate(): InputElement<Date | undefined>;
    abstract createInputTime(): InputElement<number | undefined>;
    abstract createInputDateTime(): InputElement<Date | undefined>;
    abstract createButtonIcon(data?: Partial<ButtonElementIconData>): ButtonElementIcon;
    abstract createButtonGeneral(data?: Partial<ButtonElementGeneralData>): ButtonElementGeneral;
    abstract createGrid<T extends UIElement = UIElement>(elements: Observable<T[]>): Grid<T>;
    abstract createInfoBlock(): InfoBlock;
}
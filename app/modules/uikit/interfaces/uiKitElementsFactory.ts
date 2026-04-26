import type { ButtonElement } from './buttonElement';
import type { InputElement } from './inputElement';
import type { Grid } from './grid';
import type { UIElement } from './uiElement';
import type { Observable } from '@/modules/shared/interfaces/observable';

export abstract class UIKitElementsFactory
{
    abstract createInputText(): InputElement<string>;
    abstract createTextarea(): InputElement<string>;
    abstract createInputDate(): InputElement<Date | undefined>;
    abstract createInputTime(): InputElement<number | undefined>;
    abstract createInputDateTime(): InputElement<Date | undefined>;
    abstract createButton(): ButtonElement;
    abstract createGrid<T extends UIElement = UIElement>(elements: Observable<T[]>): Grid<T>;
}
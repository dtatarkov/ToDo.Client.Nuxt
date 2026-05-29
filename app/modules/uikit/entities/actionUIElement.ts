import { UIElement } from '../interfaces/uiElement';
import type { UIElementAction } from './uiElementAction';

export abstract class ActionUIElement extends UIElement
{
    abstract action: UIElementAction;
}

import type { Action } from '@/modules/shared/types/action';
import { UIElement } from '../../interfaces/uiElement';

export type ButtonData = {
    isDisabled: boolean;
};

export abstract class Button extends UIElement
{
    abstract isDisabled: boolean;

    abstract setClickHandler(handler: Action): void;
}
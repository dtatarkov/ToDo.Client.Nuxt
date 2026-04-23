import type { Subscribable } from '@shared/interfaces/subscribable';
import type { ButtonElementColor } from '../types/buttonElementColor';
import { UIElement } from './uiElement';
import type { ButtonElementData } from '../types/buttonElementData';

export abstract class ButtonElement extends UIElement<string> implements ButtonElementData
{
    abstract title: string;
    abstract isDisabled: boolean;
    abstract isLoading: boolean;
    abstract color: ButtonElementColor;
    abstract readonly click: Subscribable;
}
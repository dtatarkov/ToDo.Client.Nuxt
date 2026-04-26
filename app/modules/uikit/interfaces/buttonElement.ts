import type { Subscribable } from '@/modules/shared/interfaces/subscribable';
import type { ButtonElementColor } from '../types/buttonElementColor';
import { UIElement } from './uiElement';
import type { ButtonElementData } from '../types/buttonElementData';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';

export abstract class ButtonElement extends UIElement<string> implements ButtonElementData, Destroyable
{
    abstract title: string;
    abstract isDisabled: boolean;
    abstract isLoading: boolean;
    abstract color: ButtonElementColor;
    abstract readonly click: Subscribable;
    abstract destroy(): void;
}
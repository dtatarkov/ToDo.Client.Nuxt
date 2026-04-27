import type { Subscribable } from '@/modules/shared/interfaces/subscribable';
import { UIElement } from './uiElement';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';

export type ButtonElementBaseData = {
    isDisabled: boolean;
};

export abstract class ButtonElementBase extends UIElement<string> implements Destroyable
{
    abstract isDisabled: boolean;

    abstract readonly click: Subscribable;

    abstract destroy(): void;
}
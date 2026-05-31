import type { Action } from '@/modules/shared/types/action';
import { Viewmodel } from '../../interfaces/viewmodel';

export type ButtonData = {
    isDisabled: boolean;
};

export type ButtonHandlers = {
    click: Action;
};

export abstract class Button extends Viewmodel<string>
{
    abstract isDisabled: boolean;

    abstract setClickHandler(handler: Action): void;
    abstract applyHandlers(handlers: ButtonHandlers): void;
}
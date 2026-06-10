import { UIElement } from '../uiElement';
import type { CallbacksOwner } from '@/modules/shared/interfaces/callbacksOwner';

export type ButtonData = {
    isDisabled: boolean;
};

export type ButtonCallbacks = {
    click(): void;
};

export abstract class Button extends UIElement implements CallbacksOwner<ButtonCallbacks>
{
    abstract readonly isDisabled: boolean;

    abstract disable(): void;
    abstract enable(): void;

    abstract on(callbacks: Partial<ButtonCallbacks>): void;
}
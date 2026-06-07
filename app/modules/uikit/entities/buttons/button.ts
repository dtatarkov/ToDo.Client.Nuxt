import { UIElement } from '../uiElement';
import type { CallbacksOwners } from '@/modules/shared/interfaces/callbacksOwners';

export type ButtonData = {
    isDisabled: boolean;
};

export type ButtonCallbacks = {
    click(): void;
};

export abstract class Button extends UIElement implements CallbacksOwners<ButtonCallbacks>
{
    abstract readonly isDisabled: boolean;

    abstract disable(): void;
    abstract enable(): void;

    abstract on(callbacks: Partial<ButtonCallbacks>): void;
}
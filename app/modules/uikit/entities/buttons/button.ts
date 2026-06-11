import { UIElement } from '../uiElement';
import type { CallbacksOwner } from '@/modules/shared/interfaces/callbacksOwner';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';

export type ButtonData = {
    isDisabled: boolean;
};

export type ButtonCallbacks = {
    click(): void;
};

export abstract class Button extends UIElement implements CallbacksOwner<ButtonCallbacks>
{
    abstract readonly isDisabled: boolean;

    abstract setCommand(command: AsyncCommand): void;

    abstract disable(): void;
    abstract enable(): void;

    abstract on(callbacks: Partial<ButtonCallbacks>): void;
}
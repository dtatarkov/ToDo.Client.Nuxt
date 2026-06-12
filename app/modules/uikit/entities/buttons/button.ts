import { UIElement } from '../uiElement';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';

export abstract class Button extends UIElement
{
    abstract readonly isDisabled: boolean;

    abstract setCommand(command: AsyncCommand): void;

    abstract disable(): void;
    abstract enable(): void;
    abstract click(): void;

    abstract onClick(handler: Action, disposeToken: DisposeToken): void;
}
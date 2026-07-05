import { UIElement } from '../uiElement';
import type { AsyncCommand, DisposeToken , Action  } from '@packages/shared';



export abstract class Button extends UIElement
{
    abstract readonly isDisabled: boolean;

    abstract getCommand(): AsyncCommand | undefined;
    abstract setCommand(command: AsyncCommand): void;

    abstract disable(): void;
    abstract enable(): void;
    abstract click(): void;

    abstract onClick(handler: Action, disposeToken?: DisposeToken): void;
}
import { Viewmodel } from '@client/ui-core';
import type { ButtonData } from '../types/buttonData';
import type { AsyncCommand, Action, DisposeToken } from '@client/shared';

export abstract class ButtonBaseViewmodel<TState extends ButtonData = ButtonData> extends Viewmodel<TState>
{
    abstract getCommand(): AsyncCommand | undefined;
    abstract setCommand(command: AsyncCommand): void;
    abstract disable(): void;
    abstract enable(): void;
    abstract click(): void;
    abstract onClick(handler: Action, disposeToken?: DisposeToken): void;
}

import type { AsyncCommand, DisposeToken, Action } from '@client/shared';

export abstract class Button implements Disposable
{
    abstract readonly isDisabled: boolean;

    abstract getCommand(): AsyncCommand | undefined;
    abstract setCommand(command: AsyncCommand): void;

    abstract disable(): void;
    abstract enable(): void;
    abstract click(): void;

    abstract onClick(handler: Action, disposeToken?: DisposeToken): void;

    abstract [Symbol.dispose](): void;
}
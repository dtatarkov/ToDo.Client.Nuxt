import type { Action } from '@/modules/shared/types/action';

export enum UIElementActionState
{
    idle = 0,
    processing = 1,
    finishedProcessing = 2,
}

export abstract class UIElementAction
{
    abstract readonly actionState: UIElementActionState;
    abstract executeAsync(): Promise<void>;
    abstract setActionStateChangeHandler(handler: Action<[UIElementActionState]>): void;
}
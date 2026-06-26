import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { Emptyable } from '@/modules/shared/interfaces/emptyable';

export abstract class Timeline extends UIElement implements Emptyable
{
    abstract readonly isEmpty: boolean;

    abstract onEmptyStateChange(handler: Action<[isEmpty: boolean]>, diposeToken?: DisposeToken): void;
}
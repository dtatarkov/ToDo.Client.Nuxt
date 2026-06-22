import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';

export abstract class SidebarLayer<TContent extends UIElement> extends UIElement
{
    abstract isActive: boolean;
    abstract readonly content: TContent;

    abstract isAvailable(): boolean;
    abstract onActiveStateChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void;
    abstract onAvailabilityChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void;
}
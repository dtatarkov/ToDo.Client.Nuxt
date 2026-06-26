import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class SidebarContent extends UIElement implements Disposable
{
    abstract readonly isActive: boolean;
    abstract readonly isAvailable: boolean;

    abstract activate(): void;
    abstract deactivate(): void;
    abstract onActiveStateChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void;
    abstract onAvailabilityChange(callback: Action<[boolean]>, disposeToken?: DisposeToken): void;
}
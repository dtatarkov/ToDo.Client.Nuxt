import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ObservableReadonly } from '@packages/shared';

export abstract class SidebarContent extends UIElement implements Disposable
{
    abstract isActive: ObservableReadonly<boolean>;
    abstract canActivate: ObservableReadonly<boolean>;

    abstract activate(): boolean;
    abstract deactivate(): boolean;
}
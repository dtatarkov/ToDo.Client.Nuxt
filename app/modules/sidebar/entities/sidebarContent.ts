import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';

export abstract class SidebarContent extends UIElement implements Disposable
{
    abstract isActive: ObservableReadonly<boolean>;
    abstract isAvailable: ObservableReadonly<boolean>;

    abstract activate(): void;
    abstract deactivate(): void;
}
import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { Emptyable } from '@/modules/shared/interfaces/emptyable';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';

export abstract class Timeline extends UIElement implements Emptyable
{
    abstract isEmpty: ObservableReadonly<boolean>;
}
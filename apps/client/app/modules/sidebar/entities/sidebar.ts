import type { SidebarContent } from './sidebarContent';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';

export abstract class Sidebar implements Disposable
{
    abstract readonly content: ObservableReadonly<SidebarContent | undefined>;
    abstract readonly timeline: SidebarContent;

    abstract [Symbol.dispose](): void;
}
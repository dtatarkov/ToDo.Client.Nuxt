import type { SidebarContent } from './sidebarContent';
import type { ObservableReadonly } from '@packages/shared';

export abstract class Sidebar implements Disposable
{
    abstract readonly content: ObservableReadonly<SidebarContent | undefined>;
    abstract readonly timeline: SidebarContent;

    abstract [Symbol.dispose](): void;
}
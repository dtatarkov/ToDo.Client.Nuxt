import type { SidebarContent } from './sidebarContent';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';

export abstract class Sidebar implements Disposable
{
    abstract readonly content: SidebarContent | undefined;
    abstract readonly timeline: SidebarContent;

    abstract onContentChange(callback: Action<[SidebarContent | undefined]>, disposeToken?: DisposeToken): void;

    abstract [Symbol.dispose](): void;
}
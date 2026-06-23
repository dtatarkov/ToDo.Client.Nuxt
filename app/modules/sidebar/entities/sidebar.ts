import type { SidebarLayer } from './sidebarLayer';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Timeline } from '@/modules/notifications/entities/timeline';

export type SidebarLayers = {
    timeline: SidebarLayer<Timeline>;
};

export abstract class Sidebar implements Disposable
{
    abstract readonly layers: SidebarLayers;

    abstract onLayersChange(callback: Action<[]>, disposeToken?: DisposeToken): void;
    abstract [Symbol.dispose](): void;
}
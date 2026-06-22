import type { SidebarLayer } from './sidebarLayer';
import type { NotificationsTimeline } from '@/modules/uikit/entities/notificationsTimeline';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';

export type SidebarLayers = {
    timeline: SidebarLayer<NotificationsTimeline>;
};

export abstract class Sidebar implements Disposable
{
    abstract readonly layers: SidebarLayers;

    abstract onLayersChange(callback: Action<[]>, disposeToken?: DisposeToken): void;
    abstract [Symbol.dispose](): void;
}
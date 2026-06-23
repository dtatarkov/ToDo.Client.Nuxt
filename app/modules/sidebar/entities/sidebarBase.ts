import { dependency } from '@/modules/shared/decorators/dependency';
import { Sidebar } from './sidebar';
import type { SidebarLayers } from './sidebar';
import { SidebarLayerNotificationsTimeline } from './sidebarLayerNotificationsTimeline';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { Timeline } from '@/modules/notifications/entities/timeline';

@dependency(Timeline)
export class SidebarBase extends Sidebar
{
    readonly layers: SidebarLayers;

    private layersChangeEvent = new EntityEvent();

    constructor(
        timeline: Timeline,
    )
    {
        super();

        this.layers = Object.freeze({
            timeline: new SidebarLayerNotificationsTimeline(timeline),
        });

        this.setupLayersTracking();
    }

    private setupLayersTracking(): void
    {
        for (const layer of Object.values(this.layers))
        {
            layer.onActiveStateChange(() =>
            {
                this.layersChangeEvent.emit();
            });
        }
    }

    override onLayersChange(callback: Action<[]>, disposeToken?: DisposeToken): void
    {
        this.layersChangeEvent.on(callback, disposeToken);
    }

    override[Symbol.dispose](): void
    {
        this.layersChangeEvent[Symbol.dispose]();
    }
}
import { OverlayViewmodel } from './overlayViewmodel';
import type { OverlayData } from '../types/overlayData';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import type { Overlay } from '../entities/overlay';

export class OverlayViewmodelImpl
    extends ViewmodelBase<OverlayData>
    implements OverlayViewmodel
{
    state: ObservableViewmodelStateBase<OverlayData>;

    constructor(
        private overlay: Overlay
    )
    {
        super();

        this.state = new ObservableViewmodelStateBase<OverlayData>({
            elements: [],
        });

        this.overlay.elements.on(() => this.updateStateElements(), this.disposeToken);
    }

    private updateStateElements()
    {
        const elementVms = this.overlay.elements.value;

        const elementsData = elementVms.map(
            vm => vm.state.value
        );

        this.state.update({ elements: elementsData });
    }

    override[Symbol.dispose](): void
    {
        this.overlay[Symbol.dispose]();
        super[Symbol.dispose]();
    }
}

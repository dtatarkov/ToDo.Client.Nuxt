import { ObservableArrayBase, type ObservableReadonly } from '@client/shared';
import type { ModalViewmodelsFactory, ModalConfiguration } from '../factories/modalViewmodelsFactory';
import type { OverlayElementsData } from '../types/overlayElementsData';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import type { OverlayElementViewmodel } from '../viewmodels/overlayElementViewmodel';
import { Overlay } from './overlay';


export class OverlayBase extends Overlay
{
    private elementsInternal = new ObservableArrayBase<OverlayElementViewmodel<OverlayElementsData>>();

    readonly elements: ObservableReadonly<readonly OverlayElementViewmodel<OverlayElementsData>[]> = this.elementsInternal;

    constructor(
        private modalFactory: ModalViewmodelsFactory
    )
    {
        super();
    }

    override createModal<TContentData extends Record<string, any> = Record<string, any>>(
        configuration: ModalConfiguration<TContentData>
    ): ModalViewmodel<TContentData>
    {
        const modal = this.modalFactory.create(
            configuration,

            () =>
            {
                this.elementsInternal.remove(modal);
            }
        );

        this.elementsInternal.add(modal);

        return modal;
    }

    override[Symbol.dispose](): void
    {
        this.elementsInternal[Symbol.dispose]();
    }
}
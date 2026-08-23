import type { ObservableReadonly } from '@client/shared';
import type { OverlayElementViewmodel } from '../viewmodels/overlayElementViewmodel';
import type { OverlayElementsData } from '../types/overlayElementsData';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import type { ModalConfiguration } from '../factories/modalViewmodelsFactory';

export abstract class Overlay
{
    abstract readonly elements: ObservableReadonly<readonly OverlayElementViewmodel<OverlayElementsData>[]>;

    abstract createModal<TContentData extends Record<string, any> = Record<string, any>>(
        configuration: ModalConfiguration<TContentData>
    ): ModalViewmodel<TContentData>;

    abstract [Symbol.dispose](): void;
}

import type { OverlayElementData } from '../types/overlayElementData';
import { ViewmodelBase } from '@client/ui-core';
import type { OverlayElementViewmodel } from './overlayElementViewmodel';

export abstract class OverlayElementViewmodelBase<TData extends OverlayElementData>
    extends ViewmodelBase<TData>
    implements OverlayElementViewmodel<TData>
{
    constructor(
        private readonly onClose?: () => void
    )
    {
        super();
    }

    close(): void
    {
        this.onClose?.();
        this[Symbol.dispose]();
    }
}

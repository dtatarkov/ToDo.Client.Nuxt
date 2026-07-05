import { DisposeToken } from '@packages/shared';
import { OverlayElement } from './overlayElement';
import type { OverlayElementsStore } from './overlayElementsStore';

export abstract class OverlayElementBase<S extends OverlayElementsStore> extends OverlayElement
{
    protected disposeToken = new DisposeToken();

    constructor(protected store: S)
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.store.remove(this);
        });
    }

    override close()
    {
        this[Symbol.dispose]();
    }

    override[Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
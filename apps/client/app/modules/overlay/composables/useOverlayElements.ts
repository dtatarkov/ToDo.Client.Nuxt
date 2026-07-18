import { useEventDrivenRef } from '@client/ui-vue';
import { Overlay } from '../entities/overlay';

export function useOverlayElements()
{
    const overlay = useService(Overlay);

    const overlayElements = useEventDrivenRef({
        getter: () => overlay.getElements(),
        on: (callback, disposeToken) => overlay.onElementsChange(callback, disposeToken),
    });

    return { overlayElements };
}

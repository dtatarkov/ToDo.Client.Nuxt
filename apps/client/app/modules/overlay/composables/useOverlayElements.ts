import { useService } from '@/modules/shared/composables/useService';
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

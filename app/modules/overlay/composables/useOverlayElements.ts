import { useService } from '@/modules/shared/composables/useService';
import { useEventDrivenRef } from '@/modules/shared/composables/useEventDrivenRef';
import { Overlay } from '../entities/overlay';

export function useOverlayElements()
{
    const overlay = useService(Overlay);

    const overlayElements = useEventDrivenRef(
        () => overlay.getElements(),
        (callback, disposeToken) => overlay.onElementsChange(callback, disposeToken),
    );

    watchEffect(() =>
    {
        console.log('overlayElements', overlayElements.value);
    });

    return { overlayElements };
}

import { customRef } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { Overlay } from '../entities/overlay';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { ReadonlyRefValueChangeException } from '@/modules/shared/exceptions/readonlyRefValueChangeException';
import type { OverlayElement } from '../entities/overlayElement';
import type { Ref } from 'vue';

export function useOverlayElements(): { overlayElements: Ref<OverlayElement[]>; }
{
    const overlay = useService(Overlay);
    const disposeToken = useService(DisposeToken);

    const overlayElements = customRef<OverlayElement[]>((track, trigger) =>
    {
        overlay.onElementsChange(() =>
        {
            trigger();
        }, disposeToken);

        return {
            get()
            {
                track();
                return overlay.getElements();
            },

            set()
            {
                throw new ReadonlyRefValueChangeException('overlayElements');
            },
        };
    });

    return { overlayElements };
}

import { computed } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { Overlay } from '../entities/overlay';
import type { OverlayElement } from '../entities/overlayElement';
import type { Ref } from 'vue';

export function useOverlayElements(): { overlayElements: Ref<OverlayElement[]>; }
{
    const overlay = useService(Overlay);
    const overlayElements = computed(() => overlay.getElements());

    return { overlayElements };
}

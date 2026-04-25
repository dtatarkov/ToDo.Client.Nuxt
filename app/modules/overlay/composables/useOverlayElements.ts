import { OverlayService } from "../interfaces/overlayService";
import type { OverlayElement } from "../interfaces/overlayElement";
import { useObservable } from '@/modules/shared/composables/useObservable';
import { useService } from '@/modules/shared/composables/useService';

export function useOverlayElements()
{
  const overlayService = useService(OverlayService);
  const overlayElements: Ref<OverlayElement[]> = useObservable(overlayService.getElements());

  return { overlayElements };
}
import { OverlayService } from "../interfaces/overlayService";
import type { OverlayElementViewmodel } from "../interfaces/overlayElementViewmodel";
import { useObservable } from '@/modules/shared/composables/useObservable';
import { useService } from '@/modules/shared/composables/useService';

export function useOverlayElements()
{
  const overlayService = useService(OverlayService);
  const overlayElements: Ref<OverlayElementViewmodel[]> = useObservable(overlayService.getElements());

  return { overlayElements };
}
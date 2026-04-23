import { OverlayService } from "../interfaces/overlayService";
import type { OverlayElement } from "../interfaces/overlayElement";
import { useObservable } from '@shared/composables/useObservable';
import { getService } from '@shared/utils/getService';

export function useOverlayElements()
{
  const overlayService = getService(OverlayService);
  const overlayElements: Ref<OverlayElement[]> = useObservable(overlayService.getElements());

  return { overlayElements };
}
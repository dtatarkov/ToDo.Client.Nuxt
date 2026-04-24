import { OverlayService } from "../interfaces/overlayService";
import type { OverlayElement } from "../interfaces/overlayElement";
import { useObservable } from '@/modules/shared/composables/useObservable';
import { getService } from '@/modules/shared/serviceLocator/serviceLocator';

export function useOverlayElements()
{
  const overlayService = getService(OverlayService);
  const overlayElements: Ref<OverlayElement[]> = useObservable(overlayService.getElements());

  return { overlayElements };
}
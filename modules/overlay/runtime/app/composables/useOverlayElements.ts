import { OverlayService } from "../interfaces/overlayService";
import type { OverlayElement } from "../interfaces/overlayElement";

export function useOverlayElements()
{
  const overlayService                         = getService(OverlayService);
  const overlayElements: Ref<OverlayElement[]> = useObservable(overlayService.getElements());

  return { overlayElements };
}
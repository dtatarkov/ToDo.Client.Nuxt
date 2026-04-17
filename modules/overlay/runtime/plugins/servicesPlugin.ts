import { OverlayBase } from "../app/entities/overlayBase";
import { Overlay } from "../app/interfaces/overlay";
import { OverlayService } from "../app/interfaces/overlayService";
import { OverlayServiceImpl } from "../app/services/overlayServiceImpl";

export default defineNuxtPlugin((nuxtApp) =>
{
  registerService(Overlay, OverlayBase, ServiceScope.Singleton);
  
  registerServiceFactory(OverlayService, () =>
  {
    const overlay        = getService(Overlay);
    const overlayService = new OverlayServiceImpl(overlay);

    return overlayService;
  }, ServiceScope.Singleton);
})
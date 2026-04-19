import { OverlayBase } from "../app/entities/overlayBase";
import { ModalFactoryImpl } from '../app/factories/modalFactoryImpl';
import { ModalFactory } from '../app/interfaces/internal/modalFactory';
import { Overlay } from "../app/interfaces/internal/overlay";
import { OverlayService } from "../app/interfaces/overlayService";
import { OverlayServiceImpl } from "../app/services/overlayServiceImpl";

export default defineNuxtPlugin(() =>
{
  registerService(Overlay, OverlayBase, ServiceScope.Singleton);

  registerServiceFactory(OverlayService, () =>
  {
    const overlay = getService(Overlay);
    const modalFactory = getService(ModalFactory);

    const overlayService = new OverlayServiceImpl(overlay, modalFactory);

    return overlayService;
  }, ServiceScope.Singleton);

  registerServiceFactory(ModalFactory, () =>
  {
    const uikitElementsFactory = getService(UIKitElementsFactory);
    const modalFactory = new ModalFactoryImpl(uikitElementsFactory);

    return modalFactory;
  }, ServiceScope.Singleton);
});
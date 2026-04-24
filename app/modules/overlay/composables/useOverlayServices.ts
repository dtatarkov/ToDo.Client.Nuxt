import { OverlayBase } from "../entities/overlayBase";
import { ModalFactoryImpl } from '../factories/modalFactoryImpl';
import { ModalFactory } from '../interfaces/internal/modalFactory';
import { Overlay } from "../interfaces/internal/overlay";
import { OverlayService } from "../interfaces/overlayService";
import { OverlayServiceImpl } from "../services/overlayServiceImpl";
import { registerService } from "@/modules/shared/serviceLocator/serviceLocator";

export function useOverlayServices(): void
{
    registerService(Overlay, OverlayBase).asScoped();
    registerService(OverlayService, OverlayServiceImpl).asTransient();
    registerService(ModalFactory, ModalFactoryImpl).asTransient();
}
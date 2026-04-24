import { OverlayBase } from "../entities/overlayBase";
import { ModalFactoryImpl } from '../factories/modalFactoryImpl';
import { ModalFactory } from '../interfaces/internal/modalFactory';
import { Overlay } from "../interfaces/internal/overlay";
import { OverlayService } from "../interfaces/overlayService";
import { OverlayServiceImpl } from "../services/overlayServiceImpl";
import { UIKitElementsFactory } from "@/modules/uikit/interfaces/uiKitElementsFactory";
import { ServiceScope } from "@/modules/shared/enums/serviceScope";
import { registerService } from "@/modules/shared/utils/registerService";
import { getService } from "@/modules/shared/utils/getService";
import { registerServiceFactory } from '@/modules/shared/utils/registerServiceFactory';

export function useOverlayServices(): void
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
}
import { OverlayBase } from "../entities/overlayBase";
import { ModalFactoryImpl } from '../factories/modalFactoryImpl';
import { ModalFactory } from '../interfaces/internal/modalFactory';
import { Overlay } from "../interfaces/internal/overlay";
import { OverlayService } from "../interfaces/overlayService";
import { OverlayServiceImpl } from "../services/overlayServiceImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useOverlayServices(): void
{
    useServiceRegistration(Overlay).to(OverlayBase).asSingleton();
    useServiceRegistration(OverlayService).to(OverlayServiceImpl).asTransient();
    useServiceRegistration(ModalFactory).to(ModalFactoryImpl).asTransient();
}
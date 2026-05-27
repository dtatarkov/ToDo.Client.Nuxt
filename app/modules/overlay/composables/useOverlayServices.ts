import { Overlay } from '../entities/overlay';
import { ModalFactory } from '../factories/modalFactory';
import { OverlayService } from "../interfaces/overlayService";
import { OverlayServiceImpl } from "../services/overlayServiceImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useOverlayServices(): void
{
    useServiceRegistration(Overlay).to(Overlay).asSingleton();
    useServiceRegistration(OverlayService).to(OverlayServiceImpl).asTransient();
    useServiceRegistration(ModalFactory).to(ModalFactory).asTransient();
}
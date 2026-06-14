import { Overlay } from '../entities/overlay';
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { OverlayBase } from '../entities/overlayBase';

export function useOverlayServices(): void
{
    useServiceRegistration(Overlay).to(OverlayBase).asSingleton();
}
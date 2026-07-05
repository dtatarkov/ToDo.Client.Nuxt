import { Overlay } from '../entities/overlay';
import { OverlayBase } from '../entities/overlayBase';

export function useOverlayServices(): void
{
    useServiceRegistration(Overlay).to(OverlayBase).asSingleton();
}
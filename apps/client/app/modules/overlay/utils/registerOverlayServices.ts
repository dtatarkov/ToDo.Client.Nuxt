import type { ServicesContainer } from '@packages/di';
import { Overlay } from '../entities/overlay';
import { OverlayBase } from '../entities/overlayBase';

export function registerOverlayServices(container: ServicesContainer): void
{
    container.bind(Overlay).to(OverlayBase).asSingleton();
}

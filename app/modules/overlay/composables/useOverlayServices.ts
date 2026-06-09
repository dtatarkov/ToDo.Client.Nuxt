import { Overlay } from '../entities/overlay';
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { GetOverlayElementsUseCase } from '../usecases/getOverlayElementsUseCase';
import { GetOverlayElementsUseCaseImpl } from '../usecases/getOverlayElementsUseCaseImpl';
import { OverlayBase } from '../entities/overlayBase';

export function useOverlayServices(): void
{
    useServiceRegistration(Overlay).to(OverlayBase).asSingleton();
    useServiceRegistration(GetOverlayElementsUseCase).to(GetOverlayElementsUseCaseImpl).asTransient();
}
import { Overlay } from '../entities/overlay';
import { ModalFactory } from '../factories/modalFactory';
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { AddFormModalUseCase } from '../usecases/addFormModalUseCase';
import { AddFormModalUseCaseImpl } from '../usecases/addFormModalUseCaseImpl';
import { GetOverlayElementsUseCase } from '../usecases/getOverlayElementsUseCase';
import { GetOverlayElementsUseCaseImpl } from '../usecases/getOverlayElementsUseCaseImpl';

export function useOverlayServices(): void
{
    useServiceRegistration(Overlay).to(Overlay).asSingleton();
    useServiceRegistration(ModalFactory).to(ModalFactory).asTransient();
    useServiceRegistration(AddFormModalUseCase).to(AddFormModalUseCaseImpl).asTransient();
    useServiceRegistration(GetOverlayElementsUseCase).to(GetOverlayElementsUseCaseImpl).asTransient();
}
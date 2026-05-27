import { dependency } from '@/modules/shared/decorators/dependency';
import type { Reactive } from 'vue';
import { Overlay } from '../entities/overlay';
import type { OverlayElementViewmodel } from '../entities/overlayElementViewmodel';
import type { GetOverlayElementsUseCase } from './getOverlayElementsUseCase';


@dependency(Overlay)
export class GetOverlayElementsUseCaseImpl implements GetOverlayElementsUseCase
{
    constructor(
        private overlay: Overlay
    )
    {
    }

    execute(): Reactive<OverlayElementViewmodel[]>
    {
        return this.overlay.getElements();
    }
}
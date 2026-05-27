import { dependency } from '@/modules/shared/decorators/dependency';
import type { Reactive } from 'vue';
import { Overlay } from '../entities/overlay';
import type { OverlayElement } from '../entities/overlayElement';
import type { GetOverlayElementsUseCase } from './getOverlayElementsUseCase';


@dependency(Overlay)
export class GetOverlayElementsUseCaseImpl implements GetOverlayElementsUseCase
{
    constructor(
        private overlay: Overlay
    )
    {
    }

    execute(): Reactive<OverlayElement[]>
    {
        return this.overlay.getElements();
    }
}
import type { OverlayElementViewmodel } from '../entities/overlayElementViewmodel';
import type { Reactive } from 'vue';

export abstract class GetOverlayElementsUseCase
{
    abstract execute(): Reactive<OverlayElementViewmodel[]>;
}
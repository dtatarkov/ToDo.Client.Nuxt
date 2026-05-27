import type { OverlayElement } from '../entities/overlayElement';
import type { Reactive } from 'vue';

export abstract class GetOverlayElementsUseCase
{
    abstract execute(): Reactive<OverlayElement[]>;
}
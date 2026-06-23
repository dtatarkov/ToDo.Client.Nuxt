import type { Toast } from './toast';
import { OverlayElementsStore } from './overlayElementsStore';

export abstract class ToastsStore extends OverlayElementsStore<Toast>
{
}
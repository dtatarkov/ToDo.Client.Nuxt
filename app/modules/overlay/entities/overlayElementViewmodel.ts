import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import type { Overlay } from './overlay';

export abstract class OverlayElementViewmodel extends Viewmodel<string>
{
  abstract close(): void;
  abstract setOverlay(overlay: Overlay): void;
}
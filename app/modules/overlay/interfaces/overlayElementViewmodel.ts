import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { Overlay } from './internal/overlay';

export abstract class OverlayElementViewmodel extends Viewmodel<string>
{
  abstract close(): void;
  abstract setOverlay(overlay: Overlay): void;
}
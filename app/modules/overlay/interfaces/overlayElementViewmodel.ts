import type { Subscribable } from '@/modules/shared/interfaces/subscribable';
import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';

export abstract class OverlayElementViewmodel extends Viewmodel<string>
{
  abstract readonly onClose: Subscribable;

  abstract close(): void;
}
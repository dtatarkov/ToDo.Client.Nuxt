import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { OverlayElementViewmodel } from "./overlayElementViewmodel";

export abstract class ModalViewmodel extends OverlayElementViewmodel
{
  abstract title: string;
  abstract description: string;
  abstract content: Viewmodel | undefined;
  abstract controls: Array<Viewmodel>;
}
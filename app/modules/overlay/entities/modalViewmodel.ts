import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { OverlayElementViewmodel } from "./overlayElementViewmodel";

export abstract class ModalViewmodel<Content extends Viewmodel = Viewmodel> extends OverlayElementViewmodel
{
  abstract title: string;
  abstract description: string;
  abstract content: Content | undefined;
  abstract isDisabled: boolean;
}
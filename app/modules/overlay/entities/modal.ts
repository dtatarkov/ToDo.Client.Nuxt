import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { OverlayElement } from "./overlayElement";

export abstract class Modal<Content extends Viewmodel = Viewmodel> extends OverlayElement
{
  abstract title: string;
  abstract description: string;
  abstract content: Content | undefined;
  abstract isDisabled: boolean;
}
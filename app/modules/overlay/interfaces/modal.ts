import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { OverlayElement } from "../interfaces/overlayElement";

export abstract class Modal extends OverlayElement
{
  abstract title: string;
  abstract description: string;
  abstract content: Viewmodel | undefined;
  abstract controls: Array<Viewmodel>;
}
import { OverlayElement } from "./overlayElement";
import type { UIElement } from '@/modules/uikit/interfaces/uiElement';

export abstract class Modal<Content extends UIElement = UIElement> extends OverlayElement
{
  abstract title: string;
  abstract description: string;
  abstract content: Content | undefined;
  abstract isDisabled: boolean;
}
import { OverlayElement } from "../interfaces/overlayElement";

export abstract class Modal extends OverlayElement
{
  abstract title: string;
  abstract description: string;
  abstract content: UIElement | undefined;

  abstract close(): void;
}
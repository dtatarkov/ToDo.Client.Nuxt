import type { Overlay } from "./internal/overlay";

export abstract class OverlayElement extends UIElement<string>
{
  abstract parent: Overlay | undefined;
}
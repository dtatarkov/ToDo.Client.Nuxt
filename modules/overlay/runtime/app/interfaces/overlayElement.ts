import type { Overlay } from "../interfaces/overlay";
import { UIElement } from "@uikit/interfaces/uiElement";

export abstract class OverlayElement extends UIElement<string>
{
  abstract parent: Overlay | undefined;
}
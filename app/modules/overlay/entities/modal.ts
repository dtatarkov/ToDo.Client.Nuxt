import { OverlayElement } from "./overlayElement";

export abstract class Modal extends OverlayElement
{
    abstract enable(): void;
    abstract disable(): void;
}
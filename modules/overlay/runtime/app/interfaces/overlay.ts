import type { OverlayElement } from "./overlayElement";
import type { Modal } from "../interfaces/modal";
import type { Observable } from "@shared/interfaces/observable";

export abstract class Overlay
{
  abstract getElements(): Observable<OverlayElement[]>;

  abstract createModal(): Modal;

  abstract removeElement(element: OverlayElement): void;
}
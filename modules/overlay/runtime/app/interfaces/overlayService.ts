import type { OverlayElement } from "../interfaces/overlayElement";
import type { Modal } from "../interfaces/modal";
import type { Observable } from "@shared/interfaces/observable";

export abstract class OverlayService
{
  abstract createModal(): Modal;

  abstract getElements(): Observable<OverlayElement[]>;
}
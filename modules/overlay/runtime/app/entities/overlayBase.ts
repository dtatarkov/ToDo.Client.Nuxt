import { Overlay } from "../interfaces/overlay";
import { type OverlayElement } from "../interfaces/overlayElement";
import { ModalBase } from "../entities/modalBase";

export class OverlayBase extends Overlay
{
  private elements = new ObservableBase(new Array<OverlayElement>());

  override getElements(): Observable<OverlayElement[]>
  {
    return this.elements;
  }

  override createModal()
  {
    const modal = new ModalBase();
    modal.parent = this;

    this.addElement(modal);

    return modal;
  }

  override removeElement(element: OverlayElement): void
  {
    if (!this.elements.value.includes(element))
    {
      return;
    }

    const currentElements = this.elements.value;
    const newElementsSet = new Set(currentElements);

    newElementsSet.delete(element);

    this.elements.value = [...newElementsSet];
  }

  private addElement(element: OverlayElement): void
  {
    const currentElements = this.elements.value;
    const newElementsSet = new Set([...currentElements, element]);

    this.elements.value = [...newElementsSet];
  }
}
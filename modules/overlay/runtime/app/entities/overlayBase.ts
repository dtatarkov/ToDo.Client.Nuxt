import { Overlay } from "../interfaces/internal/overlay";

export class OverlayBase extends Overlay
{
  private elements = new ObservableBase(new Array<OverlayElement>());

  override getElements(): Observable<OverlayElement[]>
  {
    return this.elements;
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

  override addElement(element: OverlayElement): void
  {
    const currentElements = this.elements.value;
    const newElementsSet = new Set([...currentElements, element]);

    this.elements.value = [...newElementsSet];
  }
}
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { Overlay } from "../interfaces/internal/overlay";
import type { OverlayElementViewmodel } from '../interfaces/overlayElementViewmodel';

export class OverlayBase extends Overlay
{
  private elements = new ObservableSource(new Array<OverlayElementViewmodel>());

  override getElements(): Observable<OverlayElementViewmodel[]>
  {
    return this.elements;
  }

  override addElement(element: OverlayElementViewmodel): void
  {
    const currentElementsSet = new Set(this.elements.value);

    if (currentElementsSet.has(element))
    {
      throw new Error('OverlayElement already added');
    }

    element.setOverlay(this);

    const newElementsSet = new Set([...currentElementsSet, element]);
    this.elements.value = [...newElementsSet];
  }

  override removeElement(element: OverlayElementViewmodel): void
  {
    if (!this.elements.value.includes(element))
    {
      throw new Error('OverlayElement does not exist in Overlay');
    }

    const currentElements = this.elements.value;
    const newElementsSet = new Set(currentElements);

    newElementsSet.delete(element);

    this.elements.value = [...newElementsSet];
  }
}
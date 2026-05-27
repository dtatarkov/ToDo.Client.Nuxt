import type { Observable } from '@/modules/shared/interfaces/observable';
import type { OverlayElementViewmodel } from './overlayElementViewmodel';
import { ObservableSource } from '@/modules/shared/entities/observableSource';

export class Overlay
{
  private elements = new ObservableSource(new Array<OverlayElementViewmodel>());

  getElements(): Observable<OverlayElementViewmodel[]>
  {
    return this.elements;
  }

  addElement(element: OverlayElementViewmodel): void
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

  removeElement(element: OverlayElementViewmodel): void
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
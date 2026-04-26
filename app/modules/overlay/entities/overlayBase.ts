import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { Overlay } from "../interfaces/internal/overlay";
import { OverlayElement } from '../interfaces/overlayElement';
import type { EffectsContainer } from '@/modules/shared/interfaces/effectsContainer';
import { EffectsContainerBase } from '@/modules/shared/entities/effectsContainerBase';

export class OverlayBase extends Overlay
{
  private elements = new ObservableSource(new Array<OverlayElement>());
  private elementEffects = new Map<OverlayElement, EffectsContainer>();

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

    const effectsContainer = this.elementEffects.get(element);
    effectsContainer?.destroy();
  }

  override addElement(element: OverlayElement): void
  {
    const currentElementsSet = new Set(this.elements.value);

    if (currentElementsSet.has(element))
    {
      return;
    }

    const newElementsSet = new Set([...currentElementsSet, element]);
    this.elements.value = [...newElementsSet];

    const effectsContainer = new EffectsContainerBase();
    this.elementEffects.set(element, effectsContainer);

    effectsContainer.withContainer(() =>
    {
      element.onClose.subscribe(() =>
      {
        this.removeElement(element);
      });
    });
  }
}
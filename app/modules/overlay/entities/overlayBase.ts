import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { Overlay } from "../interfaces/internal/overlay";
import { OverlayElementViewmodel } from '../interfaces/overlayElementViewmodel';
import type { EffectsContainer } from '@/modules/shared/interfaces/effectsContainer';
import { EffectsContainerImpl } from '@/modules/shared/entities/effectsContainerImpl';

export class OverlayBase extends Overlay
{
  private elements = new ObservableSource(new Array<OverlayElementViewmodel>());
  private elementEffects = new Map<OverlayElementViewmodel, EffectsContainer>();

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

    const newElementsSet = new Set([...currentElementsSet, element]);
    this.elements.value = [...newElementsSet];

    const effectsContainer = new EffectsContainerImpl();
    this.elementEffects.set(element, effectsContainer);

    effectsContainer.withContainer(() =>
    {
      element.onClose.subscribe(() =>
      {
        this.removeElement(element);
      });
    });
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

    const effectsContainer = this.elementEffects.get(element);

    if (effectsContainer == undefined)
    {
      throw new Error('EffectsContainer for element is missing');
    }

    effectsContainer.destroy();
  }
}
import type { OverlayElement } from './overlayElement';
import { removeFromArray } from '@/modules/shared/utils/removeFromArray';
import { shallowReactive } from 'vue';

export class Overlay
{
  private elements = shallowReactive(new Array<OverlayElement>());

  getElements(): OverlayElement[]
  {
    return this.elements;
  }

  addElement(element: OverlayElement): void
  {
    this.assertElementIsNotAdded(element);

    element.setOverlay(this);

    this.elements.push(element);
  }

  removeElement(element: OverlayElement): void
  {
    this.assertElementIsAdded(element);

    removeFromArray(this.elements, element);
  }

  private assertElementIsAdded(element: OverlayElement)
  {
    if (!this.elements.includes(element))
    {
      const message = 'OverlayElement does not exist in Overlay';

      console.error(message, element);
      throw new Error(message);
    }
  }

  private assertElementIsNotAdded(element: OverlayElement)
  {
    if (this.elements.includes(element))
    {
      const message = 'OverlayElement already added';

      console.error(message, element);
      throw new Error(message);
    }
  }
}
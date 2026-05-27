import type { OverlayElementViewmodel } from './overlayElementViewmodel';
import { removeFromArray } from '@/modules/shared/utils/removeFromArray';
import { shallowReactive } from 'vue';

export class Overlay
{
  private elements = shallowReactive(new Array<OverlayElementViewmodel>());

  getElements(): OverlayElementViewmodel[]
  {
    return this.elements;
  }

  addElement(element: OverlayElementViewmodel): void
  {
    this.assertElementIsNotAdded(element);

    element.setOverlay(this);

    this.elements.push(element);
  }

  removeElement(element: OverlayElementViewmodel): void
  {
    this.assertElementIsAdded(element);

    removeFromArray(this.elements, element);
  }

  private assertElementIsAdded(element: OverlayElementViewmodel)
  {
    if (!this.elements.includes(element))
    {
      const message = 'OverlayElement does not exist in Overlay';

      console.error(message, element);
      throw new Error(message);
    }
  }

  private assertElementIsNotAdded(element: OverlayElementViewmodel)
  {
    if (this.elements.includes(element))
    {
      const message = 'OverlayElement already added';

      console.error(message, element);
      throw new Error(message);
    }
  }
}
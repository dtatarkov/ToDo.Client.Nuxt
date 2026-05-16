import type { Slot } from 'vue';
import { isArray } from './isArray';

export function isEmptySlot<S extends Slot<any>>(slot?: S): boolean
{
  if (!slot)
  {
    return true;
  }

  const slotContent = slot();
  const result = !slotContent.some(x => isArray(x.children) && x.children.length > 0);

  return result;
}

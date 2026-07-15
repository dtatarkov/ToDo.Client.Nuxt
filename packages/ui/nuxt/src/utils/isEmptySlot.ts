import type { Slot } from 'vue';

export function isEmptySlot<S extends Slot<any>>(slot?: S): boolean
{
  if (!slot)
  {
    return true;
  }

  const slotContent = slot({});

  if (!slotContent)
  {
    return true;
  }

  const result = slotContent.length == 0;

  return result;
}

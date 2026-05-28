import type { InputElementDateTime } from './inputElementDateTime';
import { InputElementBase } from './inputElementBase';
import VInputDateTime from '@/modules/uikit/components/VInputDateTime.vue';

export class InputElementDateTimeBase extends InputElementBase<Date | undefined> implements InputElementDateTime
{
  get vnode()
  {
    return h(VInputDateTime, this.data);
  }

  protected override getDefaultValue(): Date | undefined
  {
    return undefined;
  }
}
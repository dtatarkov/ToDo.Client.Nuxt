import type { InputElementTime } from './inputElementTime';
import { InputElementBase } from './inputElementBase';
import VInputTime from '@/modules/uikit/components/VInputTime.vue';

export class InputElementTimeBase extends InputElementBase<number | undefined> implements InputElementTime 
{
  get vnode()
  {
    return h(VInputTime, this.data);
  }

  protected override getDefaultValue(): number | undefined
  {
    return undefined;
  }
}

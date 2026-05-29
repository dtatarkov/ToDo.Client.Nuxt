import type { InputElementDateTime } from './inputElementDateTime';
import { InputElementBase } from './inputElementBase';
import VInputDateTime from '@/modules/uikit/components/VInputDateTime.vue';

export class InputElementDateTimeBase extends InputElementBase<Date | undefined> implements InputElementDateTime
{
  protected component = VInputDateTime;

  protected override getDefaultValue(): Date | undefined
  {
    return undefined;
  }
}
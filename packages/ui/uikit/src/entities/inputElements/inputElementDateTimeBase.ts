import type { InputElementDateTime } from './inputElementDateTime';
import { InputElementBase } from './inputElementBase';

export class InputElementDateTimeBase extends InputElementBase<Date | undefined> implements InputElementDateTime
{
  protected override getDefaultValue(): Date | undefined
  {
    return undefined;
  }
}
import type { InputElementTime } from './inputElementTime';
import { InputElementBase } from './inputElementBase';

export class InputElementTimeBase extends InputElementBase<number | undefined> implements InputElementTime 
{
  protected override getDefaultValue(): number | undefined
  {
    return undefined;
  }
}

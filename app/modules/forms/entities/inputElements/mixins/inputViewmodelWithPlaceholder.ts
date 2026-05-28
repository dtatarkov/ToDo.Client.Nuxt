import type { AbstractConstructor } from '@/modules/shared/types/abstractConstructor';
import type { InputElementBase } from '../inputElementBase';

export function InputViewmodelWithPlaceholder<TBase extends AbstractConstructor<InputElementBase<any>>>(Base: TBase)
{
  abstract class WithPlaceholder extends Base
  {
    constructor(...args: any[])
    {
      super(...args);

      Object.assign(this.data, {
        placeholder: ''
      });
    }

    get placeholder(): string
    {
      return this.readField('placeholder');
    }

    set placeholder(value: string)
    {
      this.writeField('placeholder', value);
    }
  }

  return WithPlaceholder;
}
import type { AbstractConstructor } from '@packages/shared';
import type { InputElementBase } from '../inputElementBase';

export function InputViewmodelWithPlaceholder<TBase extends AbstractConstructor<InputElementBase<any>>>(Base: TBase)
{
  abstract class WithPlaceholder extends Base
  {
    constructor(...args: any[])
    {
      super(...args);

      Object.assign(this.props, {
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
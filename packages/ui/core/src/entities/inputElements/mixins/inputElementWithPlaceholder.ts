import type { AbstractConstructor } from '@client/shared';
import type { InputElementBase } from '../inputElementBase';
import type { MessageKey } from '@client/infrastructure-messages';

export function InputElementWithPlaceholder<TBase extends AbstractConstructor<InputElementBase<any>>>(Base: TBase)
{
  abstract class WithPlaceholder extends Base
  {
    constructor(...args: any[])
    {
      super(...args);

      Object.assign(this.props, {
        placeholderKey: undefined
      });
    }

    get placeholderKey(): MessageKey | undefined
    {
      return this.readField('placeholderKey');
    }

    set placeholderKey(value: MessageKey | undefined)
    {
      this.writeField('placeholderKey', value);
    }
  }

  return WithPlaceholder;
}
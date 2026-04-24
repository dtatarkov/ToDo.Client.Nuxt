import { mergeDeep } from '@/modules/shared/utils/mergeDeep';
import type { InputElementNuxtUIBase, InputElementNuxtUIBaseProps } from "../entities/inputElements/base/inputElementNuxtUIBase";
import type { AbstractConstructor } from '@/modules/shared/types/abstractConstructor';
import type { InputElementData } from '../types/inputElements/inputElementData';

export function InputElementWithPlaceholder<TBase extends AbstractConstructor<InputElementNuxtUIBase<any, InputElementNuxtUIBaseProps<any> & { placeholder: string; }, InputElementData<any> & { placeholder: string; }>>>(Base: TBase)
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
      return this.data.placeholder;
    }

    set placeholder(value: string)
    {
      this.data.placeholder = value;
    }

    protected override getPropsScheme()
    {
      return mergeDeep(super.getPropsScheme(), {
        placeholder: {
          value: ''
        }
      });
    }

    protected override getDataScheme()
    {
      return mergeDeep(super.getDataScheme(), {
        placeholder: {}
      });
    }
  }

  return WithPlaceholder;
}
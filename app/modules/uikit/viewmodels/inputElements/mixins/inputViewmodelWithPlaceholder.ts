import { mergeDeep } from '@/modules/shared/utils/mergeDeep';
import type { InputViewmodelNuxtUIBase, InputViewmodelNuxtUIBaseProps } from "../base/inputViewmodelNuxtUIBase";
import type { AbstractConstructor } from '@/modules/shared/types/abstractConstructor';
import type { InputViewmodelData } from '../../../types/inputViewmodels/inputViewmodelData';

export function InputViewmodelWithPlaceholder<TBase extends AbstractConstructor<InputViewmodelNuxtUIBase<any, InputViewmodelNuxtUIBaseProps<any> & { placeholder: string; }, InputViewmodelData<any> & { placeholder: string; }>>>(Base: TBase)
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
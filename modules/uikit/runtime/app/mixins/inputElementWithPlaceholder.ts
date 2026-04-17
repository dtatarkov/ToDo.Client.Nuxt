import type { InputElementBase } from "../entities/inputElements/inputElementBase";

export function InputElementWithPlaceholder<TBase extends AbstractConstructor<InputElementBase>>(Base: TBase)
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
  }

  return WithPlaceholder;
}
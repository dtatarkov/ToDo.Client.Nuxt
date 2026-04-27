import { UInput } from "#components";
import { InputElementWithPlaceholder } from "./mixins/inputElementWithPlaceholder";
import type { InputElementTextData } from '../../types/inputElements/inputElementTextData';
import { InputElementNuxtUIBaseString, type InputElementNuxtUIBaseStringProps } from "./base/inputElementNuxtUIBaseString";

type InputElementTextProps = InputElementNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputElementText extends InputElementWithPlaceholder(InputElementNuxtUIBaseString<InputElementTextProps, InputElementTextData>) implements InputElementTextData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.props);
    }
  };
}
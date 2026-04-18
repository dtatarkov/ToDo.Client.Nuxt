import { UInput } from "#components";
import { InputElementWithPlaceholder } from "../../mixins/inputElementWithPlaceholder";
import { InputElementNuxtUIBaseString, type InputElementNuxtUIBaseStringProps } from "./internal/inputElementNuxtUIBaseString";

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
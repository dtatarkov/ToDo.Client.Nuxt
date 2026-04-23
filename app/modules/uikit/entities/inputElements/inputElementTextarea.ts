import { UTextarea } from "#components";
import { InputElementWithPlaceholder } from "../../mixins/inputElementWithPlaceholder";
import type { InputElementTextareaData } from '../../types/inputElements/inputElementTextareaData';
import type { InputElementTextData } from '../../types/inputElements/inputElementTextData';
import { InputElementNuxtUIBaseString, type InputElementNuxtUIBaseStringProps } from "./base/inputElementNuxtUIBaseString";

type InputElementTextareaProps = InputElementNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputElementTextarea extends InputElementWithPlaceholder(InputElementNuxtUIBaseString<InputElementTextareaProps, InputElementTextData>) implements InputElementTextareaData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.props);
    }
  };
}
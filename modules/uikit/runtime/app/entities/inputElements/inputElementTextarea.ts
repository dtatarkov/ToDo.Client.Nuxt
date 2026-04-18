import { UTextarea } from "#components";
import { InputElementWithPlaceholder } from "../../mixins/inputElementWithPlaceholder";
import { InputElementNuxtUIBaseString, type InputElementNuxtUIBaseStringProps } from "./inputElementNuxtUIBaseString";

type InputElementTextareaProps = InputElementNuxtUIBaseStringProps & {
  placeholder: string;
}

export class InputElementTextArea extends InputElementWithPlaceholder(InputElementNuxtUIBaseString<InputElementTextareaProps, InputElementTextData>) implements InputElementTextareaData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.data);
    }
  }
}
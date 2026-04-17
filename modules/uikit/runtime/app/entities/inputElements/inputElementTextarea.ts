import { UTextarea } from "#components";
import { InputElementWithPlaceholder } from "../../mixins/inputElementWithPlaceholder";
import { InputElementBaseString } from "./inputElementBaseString";

export class InputElementTextArea extends InputElementWithPlaceholder(InputElementBaseString) implements InputElementTextareaData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.data);
    }
  }
}
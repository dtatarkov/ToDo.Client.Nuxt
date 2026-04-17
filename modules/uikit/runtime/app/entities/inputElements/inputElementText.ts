import { UInput } from "#components";
import { InputElementWithPlaceholder } from "../../mixins/inputElementWithPlaceholder";
import { InputElementBaseString } from "./inputElementBaseString";

export class InputElementText extends InputElementWithPlaceholder(InputElementBaseString) implements InputElementTextData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.data);
    }
  }
}
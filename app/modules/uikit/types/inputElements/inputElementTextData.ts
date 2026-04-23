import type { InputElementData } from "./inputElementData";

export type InputElementTextData = InputElementData<string> & {
  placeholder: string;
}
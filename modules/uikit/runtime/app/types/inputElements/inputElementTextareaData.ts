import type { InputElementData } from "./inputElementData";

export type InputElementTextareaData = InputElementData<string> & {
  placeholder: string;
};
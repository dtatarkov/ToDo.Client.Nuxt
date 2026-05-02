import type { InputViewmodelData } from "./inputViewmodelData";

export type InputTextViewmodelData = InputViewmodelData<string> & {
  placeholder: string;
};
import type { InputViewmodelData } from "./inputViewmodelData";

export type InputTextareaViewmodelData = InputViewmodelData<string> & {
  placeholder: string;
};
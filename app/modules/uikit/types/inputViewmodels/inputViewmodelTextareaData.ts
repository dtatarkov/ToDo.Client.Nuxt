import type { InputViewmodelData } from "./inputViewmodelData";

export type InputViewmodelTextareaData = InputViewmodelData<string> & {
  placeholder: string;
};
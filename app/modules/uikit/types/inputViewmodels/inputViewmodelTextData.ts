import type { InputViewmodelData } from "./inputViewmodelData";

export type InputViewmodelTextData = InputViewmodelData<string> & {
  placeholder: string;
};
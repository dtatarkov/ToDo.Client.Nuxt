import { Viewmodel } from "./viewmodel";
import type { InputViewmodelData } from "../types/inputViewmodels/inputViewmodelData";

export abstract class InputViewmodel<V = any> extends Viewmodel<string> implements InputViewmodelData<V>
{
  abstract id: string | undefined;
  abstract name: string | undefined;
  abstract autofocus: boolean;
  abstract value: V;
  abstract isDisabled: boolean;

  abstract disable(): void;
  abstract enable(): void;
}
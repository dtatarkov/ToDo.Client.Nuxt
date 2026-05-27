import { Viewmodel } from "../../../uikit/interfaces/viewmodel";
import type { InputViewmodelData } from "../../../uikit/types/inputViewmodels/inputViewmodelData";

export abstract class InputElement<V = any> extends Viewmodel<string> implements InputViewmodelData<V>
{
  abstract id: string | undefined;
  abstract name: string | undefined;
  abstract hasAutofocus: boolean;
  abstract value: V;
  abstract isDisabled: boolean;

  abstract disable(): void;
  abstract enable(): void;
}
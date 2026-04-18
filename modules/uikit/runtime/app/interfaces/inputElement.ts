import { UIElement } from "./uiElement";
import type { InputElementData } from "../types/inputElements/inputElementData";

export abstract class InputElement<V = any> extends UIElement<string> implements InputElementData<V>
{
  abstract id: string;
  abstract name: string;
  abstract autofocus: boolean;
  abstract value: V;
}
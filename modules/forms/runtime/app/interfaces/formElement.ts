import { UIElement } from "@uikit/interfaces/uiElement";

export abstract class FormElement<V = any> extends UIElement<string>
{
  abstract name: string;

  abstract setValue(value: V): void
}
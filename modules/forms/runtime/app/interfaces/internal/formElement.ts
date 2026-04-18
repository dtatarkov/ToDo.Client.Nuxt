export abstract class FormElement<V = any> extends UIElement<string>
{
  abstract name: string;
  abstract value: V;
}
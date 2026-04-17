export abstract class FormField extends UIElement<string>
{
  abstract name: string;
  abstract label: string;
  abstract content: UIElement | undefined;
}
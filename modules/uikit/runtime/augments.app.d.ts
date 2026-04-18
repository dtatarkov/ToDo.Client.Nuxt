import { InputElement as InputElementImport } from './app/interfaces/inputElement';
import { UIElement as UIElementImport } from './app/interfaces/uiElement';

export { };

declare global
{
  export type InputElement<V = any> = InputElementImport<V>;
  export type UIElement<Key extends string | number = string | number> = UIElementImport<Key>;
}
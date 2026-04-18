import { InputElement as InputElementImport } from './app/interfaces/inputElement';
import { UIElement as UIElementImport } from './app/interfaces/uiElement';
import { UIKitElementsFactory as UIKitElementsFactoryImport } from './app/interfaces/uiKitElementsFactory';
import { ButtonElement as ButtonElementImport } from './app/interfaces/buttonElement';

export { };

declare global
{
  export type InputElement<V = any> = InputElementImport<V>;
  export type UIElement<Key extends string | number = string | number> = UIElementImport<Key>;
  export type UIKitElementsFactory = UIKitElementsFactoryImport;
  export type ButtonElement = ButtonElementImport;
}
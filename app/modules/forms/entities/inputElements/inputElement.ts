import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { Action } from '@/modules/shared/types/action';

export interface InputElementData<V>
{
  id: string | undefined;
  name: string | undefined;
  value: V;
  hasAutofocus: boolean;
  isDisabled: boolean;
};

export abstract class InputElement<V = unknown> extends UIElement implements InputElementData<V>
{
  abstract id: string | undefined;
  abstract name: string | undefined;
  abstract hasAutofocus: boolean;
  abstract value: V;
  abstract isDisabled: boolean;

  abstract disable(): void;
  abstract enable(): void;

  abstract toErrorMode(): void;
  abstract toDefaultMode(): void;

  abstract setValueChangeHandler(handler: Action<[value: V]>): void;
}
import type { Action, DisposeToken } from '@client/shared';

export interface InputElementData<V>
{
  id: string | undefined;
  name: string | undefined;
  value: V;
  hasAutofocus: boolean;
  isDisabled: boolean;
};

export abstract class InputElement<V = any> implements InputElementData<V>
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

  abstract setDefaultValue(): void;
  abstract setData(data: Partial<InputElementData<V>>): void;

  abstract onValueChange(handler: Action<[value: V]>, disposeToken?: DisposeToken): void;

  abstract [Symbol.dispose](): void;
}
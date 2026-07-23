import type { Action, DisposeToken } from '@client/shared';
import type { InputData } from '../../types/inputData';

export abstract class InputElement<V = any> implements InputData<V>
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
  abstract setData(data: Partial<InputData<V>>): void;

  abstract onValueChange(handler: Action<[value: V]>, disposeToken?: DisposeToken): void;

  abstract [Symbol.dispose](): void;
}
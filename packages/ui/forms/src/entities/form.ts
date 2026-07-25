import type { FormElement } from './formElement';
import type { FormValidationError } from './formValidationError';
import type { Action, AsyncCommand, DisposeToken } from '@client/shared';

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> implements Disposable
{
  abstract getElements(): FormElement[];
  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract isDisabled(): boolean;

  abstract getSubmitCommand(): AsyncCommand;

  abstract onValidationError(handler: Action<[FormValidationError]>, token?: DisposeToken): void;

  abstract [Symbol.dispose](): void;
}
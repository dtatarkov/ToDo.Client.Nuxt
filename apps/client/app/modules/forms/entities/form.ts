import type { FormElement } from './formElement';
import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { FormValidationError } from './formValidationError';
import type { FormElementsCreateData } from '../types/formElementsCreateData';
import type { Action, AsyncCommand, DisposeToken, Func } from '@packages/shared';

export type FormConfiguration<TEntity extends Record<string, any>> = {
  submit: Func<Promise<void>, [Record<keyof TEntity, any>]>;
  elements: FormElementsCreateData;
};

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends UIElement implements Disposable
{
  abstract getElements(): FormElement[];
  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract isDisabled(): boolean;

  abstract getSubmitCommand(): AsyncCommand;

  abstract onValidationError(handler: Action<[FormValidationError]>, token?: DisposeToken): void;
}
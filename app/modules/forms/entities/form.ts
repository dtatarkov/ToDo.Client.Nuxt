import type { FormElement } from './formElement';
import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { Func } from '@/modules/shared/types/func';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { FormValidationError } from './formValidationError';

export type FormConfiguration<TEntity extends Record<string, any>> = {
  submit: Func<Promise<void>, [Record<keyof TEntity, any>]>;
  scheme: EntityScheme<TEntity>;
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
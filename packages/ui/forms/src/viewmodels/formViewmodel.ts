import type { FormValidationError } from '../entities/formValidationError';
import type { Action, AsyncCommand, DisposeToken } from '@client/shared';
import type { FormViewmodelState } from '../types/formViewmodelState';
import { Viewmodel } from '@client/ui-core';

export abstract class FormViewmodel<TEntity extends Record<string, any> = Record<string, any>> extends Viewmodel<FormViewmodelState<TEntity>>
{
  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(change: Partial<Record<keyof TEntity, any>>): void;
  abstract getSubmitCommand(): AsyncCommand;

  abstract onValidationError(handler: Action<[FormValidationError]>, token?: DisposeToken): void;
}

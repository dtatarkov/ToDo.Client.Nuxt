import type { FormValidationError } from '../entities/formValidationError';
import type { Action, AsyncCommand, DisposeToken } from '@client/shared';
import { Viewmodel } from '@client/ui-core';
import type { FormState } from '../types/formState';

export abstract class FormViewmodel<TEntity extends Record<string, any> = Record<string, any>> extends Viewmodel<FormState>
{
  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(change: Partial<Record<keyof TEntity, any>>): void;
  abstract getSubmitCommand(): AsyncCommand;

  abstract onValidationError(handler: Action<[FormValidationError]>, token?: DisposeToken): void;
}

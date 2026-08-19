import type { FormValidationMessages } from '../types/formValidationMessages';
import type { Action, AsyncCommand, DisposeToken } from '@client/shared';
import { Viewmodel } from '@client/ui-core';
import type { FormData } from '../types/formData';

export abstract class FormViewmodel<TEntity extends Record<string, any> = Record<string, any>> extends Viewmodel<FormData>
{
  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(change: Partial<Record<keyof TEntity, any>>): void;
  abstract getSubmitCommand(): AsyncCommand;
  abstract submitAsync(): Promise<void>;

  abstract onValidationError(handler: Action<[FormValidationMessages<TEntity>]>, token?: DisposeToken): void;
}

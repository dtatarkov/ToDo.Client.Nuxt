import type { FormElementCreateData } from "../types/formElementCreateData";
import type { Action } from '@/modules/shared/types/action';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';
import { UIElement } from '@/modules/uikit/interfaces/uiElement';
import type { FormElement } from './formElement';

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends UIElement implements Destroyable
{
  abstract readonly elements: FormElement[];
  abstract readonly isDisabled: boolean;

  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>): void;
  abstract submit(): Promise<void>;
  abstract setDisabledStateChangeHandler(handler: Action<[boolean]>): void;
  abstract setSubmittingStateChangeHandler(handler: Action<[boolean]>): void;
  abstract setSubmittedHandler(handler: Action): void;
  abstract destroy(): void;
}
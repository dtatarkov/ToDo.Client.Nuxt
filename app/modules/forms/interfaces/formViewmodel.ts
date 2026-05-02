import { Viewmodel } from "@/modules/uikit/interfaces/viewmodel";
import type { FormElementViewmodelCreateData } from "../types/formElementViewmodelCreateData";
import type { Action } from '@/modules/shared/types/action';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';

export abstract class FormViewmodel<TEntity extends Record<string, any> = Record<string, any>> extends Viewmodel implements Destroyable
{
  abstract readonly elements: Viewmodel[];
  abstract readonly isDisabled: boolean;

  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementViewmodelCreateData>>): void;
  abstract submit(): Promise<void>;
  abstract setDisabledStateChangeHandler(handler: Action<[boolean]>): void;
  abstract setSubmittedHandler(handler: Action): void;
  abstract destroy(): void;
}
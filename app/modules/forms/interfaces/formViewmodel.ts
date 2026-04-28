import { Viewmodel } from "@/modules/uikit/interfaces/viewmodel";
import type { FormElementViewmodelCreateData } from "../types/formElementViewmodelCreateData";
import type { Subscribable } from "@/modules/shared/interfaces/subscribable";

export abstract class FormViewmodel<TEntity extends Record<string, any> = Record<string, any>> extends Viewmodel
{
  abstract readonly elements: Viewmodel[];
  abstract readonly isDisabled: boolean;

  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementViewmodelCreateData>>): void;
  abstract submit(): Promise<void>;

  abstract readonly onDisabledStateChange: Subscribable<boolean>;
  abstract readonly onSubmitted: Subscribable<void>;
}
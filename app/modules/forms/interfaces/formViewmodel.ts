import { Viewmodel } from "@/modules/uikit/interfaces/viewmodel";
import type { FormElementViewmodelCreateData } from "../types/formElementViewmodelCreateData";
import type { Func } from "@/modules/shared/types/func";
import type { Subscribable } from "@/modules/shared/interfaces/subscribable";

export abstract class FormViewmodel<TEntity extends Record<string, any> = Record<string, any>> extends Viewmodel
{
  abstract readonly elements: Viewmodel[];
  abstract readonly isDisabled: boolean;

  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementViewmodelCreateData>>): void;
  abstract submit(): void;
  abstract disable(): void;
  abstract enable(): void;
  abstract use(func: Func<Promise<void>>): Promise<void>;

  abstract readonly onSubmit: Subscribable<Record<keyof TEntity, any>>;
  abstract readonly onDisabledStateChange: Subscribable<boolean>;
}
import { UIElement } from "@/modules/uikit/interfaces/uiElement";
import type { FormElementCreateData } from "../types/formElementCreateData";
import type { Func } from "@/modules/shared/types/func";
import type { Subscribable } from "@/modules/shared/interfaces/subscribable";

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends UIElement
{
  abstract readonly elements: UIElement[];
  abstract readonly isDisabled: boolean;

  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>): void;
  abstract submit(): void;
  abstract disable(): void;
  abstract enable(): void;
  abstract use(func: Func<Promise<void>>): Promise<void>;

  abstract readonly onSubmit: Subscribable<Record<keyof TEntity, any>>;
  abstract readonly onDisabledStateChange: Subscribable<boolean>;
}
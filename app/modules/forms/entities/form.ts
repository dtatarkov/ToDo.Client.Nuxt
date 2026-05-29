import type { FormElementCreateData } from "../types/formElementCreateData";
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';
import type { FormElement } from './formElement';
import { ActionUIElement } from '@/modules/uikit/entities/actionUIElement';

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends ActionUIElement implements Destroyable
{
  abstract readonly elements: FormElement[];
  abstract readonly isDisabled: boolean;

  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>): void;
  abstract submitAsync(): Promise<void>;
  abstract destroy(): void;
}
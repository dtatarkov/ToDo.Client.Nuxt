import type { FormElementCreateData } from "../types/formElementCreateData";

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends UIElement
{
  abstract readonly elements: UIElement[];

  abstract setData(data: Record<string, any>): void

  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>): void
}
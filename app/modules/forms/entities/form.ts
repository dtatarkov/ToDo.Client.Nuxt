import type { FormElementCreateData } from "../types/formElementCreateData";
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';
import type { FormElement } from './formElement';
import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';

export type FormCallbacks<TEntity extends Record<string, any>> = {
  submit(data: Record<keyof TEntity, any>): Promise<void>;
};

export type FormConfiguration<TEntity extends Record<string, any>> = {
  callbacks?: Partial<FormCallbacks<TEntity>>;
};

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends UIElement implements Destroyable
{
  abstract readonly elements: FormElement[];
  abstract readonly isDisabled: boolean;

  abstract getData(): Record<keyof TEntity, any>;
  abstract getSubmitCommand(): AsyncCommand;

  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>): void;
  abstract setElementsFromScheme(scheme: EntityScheme<TEntity>): void;

  abstract submitAsync(): Promise<void>;
  abstract destroy(): void;
}
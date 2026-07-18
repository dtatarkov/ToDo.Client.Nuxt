import { ToDo } from "./todo";
import type { ToDoData } from '../types/todoData';
import type { ToDosStore } from './todosStore';
import { isStringEmpty, updatePropertiesWithData } from '@client/shared';

export class ToDoBase extends ToDo
{
  private ownerInternal: ToDosStore | undefined;

  private dataInternal: ToDoData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  };

  get owner(): ToDosStore | undefined
  {
    return this.ownerInternal;
  }

  set owner(value: ToDosStore | undefined)
  {
    this.ownerInternal = value;
  }

  get id(): string
  {
    return this.dataInternal.id;
  }

  get title(): string
  {
    return this.dataInternal.title;
  }

  get description(): string
  {
    return this.dataInternal.description;
  }

  get completionDatePlanned(): Date | undefined
  {
    return this.dataInternal.completionDatePlanned;
  }

  get completionDateActual(): Date | undefined
  {
    return this.dataInternal.completionDateActual;
  }

  set id(value: string)
  {
    this.dataInternal.id = value;
  }

  set title(value: string)
  {
    this.dataInternal.title = value;
  }

  set description(value: string)
  {
    this.dataInternal.description = value;
  }

  set completionDatePlanned(value: Date | undefined)
  {
    this.dataInternal.completionDatePlanned = value;
  }

  set completionDateActual(value: Date | undefined)
  {
    this.dataInternal.completionDateActual = value;
  }

  get isNew()
  {
    return isStringEmpty(this.id);
  }

  override getData(): ToDoData
  {
    return this.dataInternal;
  }

  override setData(data: Partial<ToDoData>)
  {
    updatePropertiesWithData(this.dataInternal, data);

    return this;
  }

  override clone(): ToDo
  {
    const todo = new ToDoBase();

    todo.setData({
      id: this.id,
      title: this.title,
      description: this.description,
      completionDatePlanned: this.completionDatePlanned,
      completionDateActual: this.completionDateActual,
    } satisfies ToDoData);

    todo.owner = this.owner;

    return todo;
  }

  override async saveAsync(): Promise<void>
  {
    if (!this.owner)
    {
      throw new Error('Owner is not available');
    }

    await this.ownerInternal?.saveToDoAsync(this);
  }
}
import { ToDo } from "./todo";
import type { ToDoData } from '../types/todoData';
import type { ToDoUpdateData } from '../types/todoUpdateData';
import { updatePropertiesWithData } from '@client/shared';
import { EntityScheme } from '@client/infrastructure-entity-schemes';

export class ToDoBase extends ToDo
{
  private dataInternal: ToDoData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  };

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

    todo.setData(this.getData());

    return todo;
  }

  override getUpdateScheme(): EntityScheme<any, ToDoUpdateData>
  {
    return EntityScheme.create(scheme => ({
      id: scheme.string().required(),
      title: scheme.string().required('todo.field.title.errors.empty'),
      description: scheme.string().withDefault(''),
      completionDatePlanned: scheme.datetime(),
    }));
  }
}

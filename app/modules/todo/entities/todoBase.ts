import { ToDo, type ToDoData } from "../interfaces/todo";
import { ToDosOwner } from '../interfaces/todosOwner';

export class ToDoBase extends ToDo
{
  private _owner: ToDosOwner | undefined;

  protected data: ToDoData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  };

  get owner(): ToDosOwner | undefined
  {
    return this._owner;
  }

  set owner(value: ToDosOwner | undefined)
  {
    this._owner = value;
  }

  get id(): string
  {
    return this.data.id;
  }

  get title(): string
  {
    return this.data.title;
  }

  get description(): string
  {
    return this.data.description;
  }

  get completionDatePlanned(): Date | undefined
  {
    return this.data.completionDatePlanned;
  }

  get completionDateActual(): Date | undefined
  {
    return this.data.completionDateActual;
  }

  set id(value: string)
  {
    this.data.id = value;
  }

  set title(value: string)
  {
    this.data.title = value;
  }

  set description(value: string)
  {
    this.data.description = value;
  }

  set completionDatePlanned(value: Date | undefined)
  {
    this.data.completionDatePlanned = value;
  }

  set completionDateActual(value: Date | undefined)
  {
    this.data.completionDateActual = value;
  }

  getData(): ToDoData
  {
    return {
      ...this.data
    };
  }

  clone(): ToDo
  {
    const todo = new ToDoBase();

    todo.id = this.id;
    todo.title = this.title;
    todo.description = this.description;
    todo.completionDatePlanned = this.completionDatePlanned;
    todo.completionDateActual = this.completionDateActual;
    todo.owner = this.owner;

    return todo;
  }

  async saveAsync(): Promise<void> 
  {
    if (!this.owner)
    {
      throw new Error('Owner is not available');
    }

    this._owner?.saveToDoAsync(this);
  }
}
import { ToDo, type ToDoData } from "../interfaces/todo";
import { ToDosOwner } from '../interfaces/todosOwner';
import { ObservableSource } from '~/modules/shared/entities/observableSource';
import { Observable } from '@/modules/shared/interfaces/observable';

export class ToDoBase extends ToDo
{
  private _owner: ToDosOwner | undefined;

  private _data = new ObservableSource<ToDoData>({
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  });

  get owner(): ToDosOwner | undefined
  {
    return this._owner;
  }

  set owner(value: ToDosOwner | undefined)
  {
    this._owner = value;
  }

  get data(): Observable<ToDoData>
  {
    return this._data;
  }

  get id(): string
  {
    return this._data.value.id;
  }

  get title(): string
  {
    return this._data.value.title;
  }

  get description(): string
  {
    return this._data.value.description;
  }

  get completionDatePlanned(): Date | undefined
  {
    return this._data.value.completionDatePlanned;
  }

  get completionDateActual(): Date | undefined
  {
    return this._data.value.completionDateActual;
  }

  set id(value: string)
  {
    this._data.value = { ...this._data.value, id: value };
  }

  set title(value: string)
  {
    this._data.value = { ...this._data.value, title: value };
  }

  set description(value: string)
  {
    this._data.value = { ...this._data.value, description: value };
  }

  set completionDatePlanned(value: Date | undefined)
  {
    this._data.value = { ...this._data.value, completionDatePlanned: value };
  }

  set completionDateActual(value: Date | undefined)
  {
    this._data.value = { ...this._data.value, completionDateActual: value };
  }

  getData(): ToDoData
  {
    return {
      ...this._data.value
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
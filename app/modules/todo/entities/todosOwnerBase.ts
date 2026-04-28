import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDo } from "../interfaces/todo";
import { ToDosRepository } from "../interfaces/todosRepository";
import { ToDoNotFoundException } from "../exceptions/toDoNotFoundException";
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { dependency } from '@/modules/shared/decorators/dependency';
import { DestroyTokenBase } from '@/modules/shared/entities/destroyTokenBase';
import { ToDoFactory } from '../interfaces/todoFactory';

@dependency(ToDosRepository)
@dependency(ToDoFactory)
export class ToDosOwnerBase extends ToDosOwner implements Destroyable
{
  private _initializationPromise: Promise<void> | undefined;
  private _todos = new ObservableSource(new Array<ToDo>());
  private _destroyToken = new DestroyTokenBase();

  constructor(
    private _todosRepository: ToDosRepository,
    private _todoFactory: ToDoFactory
  )
  {
    super();
  }

  override async getAllToDosAsync(): Promise<Observable<ToDo[]>>
  {
    this._destroyToken.assertNotDestroyed();
    await this.initializeToDosAsync();

    return this._todos;
  }

  override async updateToDosAsync(): Promise<void>
  {
    this._destroyToken.assertNotDestroyed();

    if (!this._initializationPromise)
    {
      await this.initializeToDosAsync();
    }
    else
    {
      await this.updateToDosInternalAsync();
    }
  }

  override async saveToDoAsync(todo: ToDo): Promise<void>
  {
    this._destroyToken.assertNotDestroyed();
    await this.initializeToDosAsync();

    this.assertNewOrExistingToDo(todo);

    await this._todosRepository.saveToDoAsync(todo);

    if (todo.isNew)
    {
      this.addToDo(todo);
    }
  }

  override createToDo()
  {
    this._destroyToken.assertNotDestroyed();

    const todo = this._todoFactory.create();
    todo.owner = this;

    return todo;
  }

  destroy()
  {
    if (this._destroyToken.isDestroyed)
    {
      return;
    }

    this._todos.destroy();
    this._destroyToken.destroy();
  }

  private assertNewOrExistingToDo(todo: ToDo): void
  {
    if (!todo.isNew)
    {
      if (!this._todos.value.some(t => t.id === todo.id))
      {
        throw new ToDoNotFoundException(todo.id);
      }
    }
  }

  private addToDo(todo: ToDo)
  {
    this._todos.value = [...this._todos.value, todo];
  }

  private async updateToDosInternalAsync(): Promise<void>
  {
    const todos = await this._todosRepository.getAllToDosAsync();

    for (const todo of todos)
    {
      todo.owner = this;
    }

    this._todos.value = todos;
  }

  private initializeToDosAsync(): Promise<void>
  {
    if (this._initializationPromise == undefined)
    {
      this._initializationPromise = this.updateToDosInternalAsync();
    }

    return this._initializationPromise;
  }
}
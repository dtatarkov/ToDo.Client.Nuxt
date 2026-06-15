import { ToDosOwner } from "./todosOwner";
import type { ToDo } from "./todo";
import { ToDosRepository } from "../repositories/todosRepository";
import { ToDoNotFoundException } from "../exceptions/toDoNotFoundException";
import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDoFactory } from '../factories/todoFactory';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';

@dependency(ToDosRepository)
@dependency(ToDoFactory)
export class ToDosOwnerBase extends ToDosOwner
{
  private initializationPromise: Promise<void> | undefined;
  private todos = new Array<ToDo>();
  private todosChangeEvent = new EntityEvent<ToDo[]>();

  constructor(
    private todosRepository: ToDosRepository,
    private todoFactory: ToDoFactory
  )
  {
    super();
  }

  override getAllToDos(): ToDo[]
  {
    return this.todos;
  }

  override onToDosChange(callback: Action<[ToDo[]]>, disposeToken?: DisposeToken): void
  {
    this.todosChangeEvent.on(callback, disposeToken);
  }

  override async getToDoByIdAsync(id: string): Promise<ToDo | undefined>
  {
    await this.initializeToDosAsync();

    return this.todos.find(todo => todo.id === id);
  }

  override initializeToDosAsync(): Promise<void>
  {
    if (this.initializationPromise == undefined)
    {
      this.initializationPromise = this.updateToDosInternalAsync();
    }

    return this.initializationPromise;
  }

  override async updateToDosAsync(): Promise<void>
  {
    if (!this.initializationPromise)
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
    await this.initializeToDosAsync();

    this.assertNewOrExistingToDo(todo);

    if (todo.isNew)
    {
      this.todosRepository.addToDoAsync(todo);
      this.addToDo(todo);
    }
    else
    {
      this.todosRepository.updateToDoAsync(todo);
    }
  }

  override createToDo()
  {
    const todo = this.todoFactory.create();
    todo.owner = this;

    return todo;
  }

  override[Symbol.dispose](): void
  {
    this.todosChangeEvent[Symbol.dispose]();
  }

  private assertNewOrExistingToDo(todo: ToDo): void
  {
    if (!todo.isNew)
    {
      if (!this.todos.some(t => t.id === todo.id))
      {
        throw new ToDoNotFoundException(todo.id);
      }
    }
  }

  private addToDo(todo: ToDo)
  {
    this.todos.push(todo);
    this.todosChangeEvent.emit(this.todos);
  }

  private async updateToDosInternalAsync(): Promise<void>
  {
    const todos = await this.todosRepository.getAllToDosAsync();

    for (const todo of todos)
    {
      todo.owner = this;
    }

    this.todos = todos;
    this.todosChangeEvent.emit(this.todos);
  }
}
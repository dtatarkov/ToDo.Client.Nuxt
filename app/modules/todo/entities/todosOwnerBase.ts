import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDo } from "../interfaces/todo";
import { ToDosRepository } from "../interfaces/todosRepository";
import { ToDoNotFoundException } from "../exceptions/toDoNotFoundException";
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { dependency } from '@/modules/shared/decorators/dependency';
import { DestroyTokenImpl } from '@/modules/shared/entities/destroyTokenImpl';
import { ToDoFactory } from '../interfaces/todoFactory';

@dependency(ToDosRepository)
@dependency(ToDoFactory)
export class ToDosOwnerBase extends ToDosOwner implements Destroyable
{
  private initializationPromise: Promise<void> | undefined;
  private todos = new ObservableSource(new Array<ToDo>());
  private destroyToken = new DestroyTokenImpl();

  constructor(
    private todosRepository: ToDosRepository,
    private todoFactory: ToDoFactory
  )
  {
    super();
  }

  override async getAllToDosAsync(): Promise<Observable<ToDo[]>>
  {
    this.destroyToken.assertNotDestroyed();
    await this.initializeToDosAsync();

    return this.todos;
  }

  override async updateToDosAsync(): Promise<void>
  {
    this.destroyToken.assertNotDestroyed();

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
    this.destroyToken.assertNotDestroyed();
    await this.initializeToDosAsync();

    this.assertNewOrExistingToDo(todo);

    await this.todosRepository.saveToDoAsync(todo);

    if (todo.isNew)
    {
      this.addToDo(todo);
    }
  }

  override createToDo()
  {
    this.destroyToken.assertNotDestroyed();

    const todo = this.todoFactory.create();
    todo.owner = this;

    return todo;
  }

  destroy()
  {
    if (this.destroyToken.isDestroyed)
    {
      return;
    }

    this.todos.destroy();
    this.destroyToken.destroy();
  }

  private assertNewOrExistingToDo(todo: ToDo): void
  {
    if (!todo.isNew)
    {
      if (!this.todos.value.some(t => t.id === todo.id))
      {
        throw new ToDoNotFoundException(todo.id);
      }
    }
  }

  private addToDo(todo: ToDo)
  {
    this.todos.value = [...this.todos.value, todo];
  }

  private async updateToDosInternalAsync(): Promise<void>
  {
    const todos = await this.todosRepository.getAllToDosAsync();

    for (const todo of todos)
    {
      todo.owner = this;
    }

    this.todos.value = todos;
  }

  private initializeToDosAsync(): Promise<void>
  {
    if (this.initializationPromise == undefined)
    {
      this.initializationPromise = this.updateToDosInternalAsync();
    }

    return this.initializationPromise;
  }
}
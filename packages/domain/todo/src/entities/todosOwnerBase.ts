import { ToDosOwner } from "./todosOwner";
import type { ToDo } from "./todo";
import { ToDosRepository } from "../repositories/todosRepository";
import { ToDoNotFoundException } from "../exceptions/todoNotFoundException";
import { dependency } from '@client/infrastructure-di';
import { ToDoFactory } from '../factories/todoFactory';
import { EntityEvent, ObservableArrayBase } from '@client/shared';


@dependency(ToDosRepository)
@dependency(ToDoFactory)
export class ToDosOwnerBase extends ToDosOwner
{
  private initializationPromise: Promise<void> | undefined;
  private todosChangeEvent = new EntityEvent<ToDo[]>();

  todos = new ObservableArrayBase<ToDo>();

  constructor(
    private todosRepository: ToDosRepository,
    private todoFactory: ToDoFactory
  )
  {
    super();
  }

  override getAllToDos(): ToDo[]
  {
    return this.todos.value;
  }

  override async getToDoByIdAsync(id: string): Promise<ToDo | undefined>
  {
    await this.initializeToDosAsync();

    return this.todos.value.find(todo => todo.id === id);
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
      this.todos.add(todo);
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
    this.todos[Symbol.dispose]();
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

  private async updateToDosInternalAsync(): Promise<void>
  {
    const todos = await this.todosRepository.getAllToDosAsync();

    for (const todo of todos)
    {
      todo.owner = this;
    }

    this.todos.value = todos;
  }
}
import { ToDosOwner } from "./todosOwner";
import type { ToDo } from "./todo";
import { ToDosRepository } from "../repositories/todosRepository";
import { ToDoNotFoundException } from "../exceptions/toDoNotFoundException";
import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDoFactory } from '../factories/todoFactory';
import { shallowReactive, type Reactive } from 'vue';

@dependency(ToDosRepository)
@dependency(ToDoFactory)
export class ToDosOwnerBase extends ToDosOwner
{
  private initializationPromise: Promise<void> | undefined;
  private todos = shallowReactive(new Array<ToDo>());

  constructor(
    private todosRepository: ToDosRepository,
    private todoFactory: ToDoFactory
  )
  {
    super();
  }

  override getAllToDos(): Reactive<ToDo[]>
  {
    return this.todos;
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
  }

  private async updateToDosInternalAsync(): Promise<void>
  {
    const todos = await this.todosRepository.getAllToDosAsync();

    for (const todo of todos)
    {
      todo.owner = this;
    }

    this.todos.splice(0, this.todos.length, ...todos);
  }
}
import { ToDoStore } from "./todoStore";
import type { ToDoData } from '../types/todoData';
import type { ToDoAddData } from '../types/todoAddData';
import type { ToDoUpdateData } from '../types/todoUpdateData';
import { ToDosRepository } from '../repositories/todosRepository';
import { dependency } from '@client/infrastructure-di';
import { ToDoFactory } from '../factories/todoFactory';
import { DisposeToken, ObservableArrayBase, TasksQueue } from '@client/shared';
import { ToDo } from './todo';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';

@dependency(ToDosRepository)
@dependency(ToDoFactory)
export class ToDoStoreBase extends ToDoStore
{
  private disposeToken = new DisposeToken();
  private tasksQueue = new TasksQueue();
  private todosInternal = new Array<ToDo>();
  private initializePromise: Promise<void> | null = null;

  todos = new ObservableArrayBase<ToDoData>();

  constructor(
    private todosRepository: ToDosRepository,
    private todoFactory: ToDoFactory,
  )
  {
    super();

    this.initializeToDosAsync();

    this.disposeToken.registerDisposable(this.tasksQueue);
    this.disposeToken.registerDisposable(this.todos);
  }

  override async initializeToDosAsync(): Promise<void>
  {
    if (this.initializePromise)
    {
      return this.initializePromise;
    }

    this.initializePromise = this.tasksQueue.queueTask(() => this.loadToDosAsync());

    return this.initializePromise;
  }

  override async updateToDosAsync(): Promise<void>
  {
    await this.tasksQueue.queueTask(() => this.loadToDosAsync());
  }

  override async getToDoByIdAsync(id: string): Promise<ToDoData | undefined>
  {
    const todo = await this.findToDoByIdAsync(id);

    return todo?.getData();
  }

  override async addToDoAsync(data: ToDoAddData): Promise<void>
  {
    await this.tasksQueue.queueTask(async () =>
    {
      const savedData = await this.todosRepository.addToDoAsync(data);

      const todo = this.todoFactory.create(savedData);

      this.todosInternal.push(todo);
      this.updateToDos();
    });
  }

  override async updateToDoAsync(data: ToDoUpdateData): Promise<void>
  {
    await this.tasksQueue.queueTask(async () =>
    {
      const savedData = await this.todosRepository.updateToDoAsync(data);

      const existingTodo = this.todosInternal.find(t => t.id === data.id);

      if (existingTodo)
      {
        existingTodo.setData(savedData);
      }
      else
      {
        const todo = this.todoFactory.create(savedData);
        this.todosInternal.push(todo);
      }

      this.updateToDos();
    });
  }

  override getAddScheme()
  {
    return ToDo.getAddScheme();
  }

  override async getUpdateSchemeAsync(id: string): Promise<EntityScheme<any, ToDoUpdateData> | undefined>
  {
    const todo = await this.findToDoByIdAsync(id);

    return todo?.getUpdateScheme();
  }

  override[Symbol.dispose](): void
  {
    this.disposeToken[Symbol.dispose]();
  }

  private async findToDoByIdAsync(id: string): Promise<ToDo | undefined>
  {
    await this.tasksQueue.awaitAll();

    return this.todosInternal.find(t => t.id === id);
  }

  private async loadToDosAsync(): Promise<void>
  {
    const todosData = await this.todosRepository.getAllToDosAsync();

    this.todosInternal = todosData.map(data => this.todoFactory.create(data));

    this.updateToDos();
  }

  private updateToDos(): void
  {
    this.todos.value = this.todosInternal.map(todo => todo.getData());
  }
}
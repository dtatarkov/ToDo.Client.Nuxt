import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDo } from "../interfaces/todo";
import { ToDosRepository } from "../interfaces/todosRepository";
import { ToDoNotFoundException } from "../exceptions/toDoNotFoundException";
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(ToDosRepository)
export class ToDosOwnerBase extends ToDosOwner implements Destroyable
{
  protected todos = new ObservableSource(new Array<ToDo>());

  constructor(protected todosRepository: ToDosRepository)
  {
    super();
  }

  override getAllToDos(): Observable<ToDo[]>
  {
    return this.todos;
  }

  override getToDoById(id: string): ToDo | undefined
  {
    const result = this.todos.value.find(todo => todo.id === id);

    return result;
  }

  override async updateToDosAsync(): Promise<void>
  {
    const todos = await this.todosRepository.getAllToDosAsync();

    for (const todo of todos)
    {
      todo.owner = this;
    }

    this.todos.value = todos;
  }

  override async saveToDoAsync(todo: ToDo): Promise<void>
  {
    this.assertToDoExistence(todo.id);
    await this.todosRepository.saveToDoAsync(todo);
    this.assertToDoExistence(todo.id);

    const todoCopy = todo.clone();
    const newTodos = this.todos.value.map(t => t.id === todo.id ? todoCopy : t);

    this.todos.value = newTodos;
  }

  destroy()
  {
    this.todos.destroy();
  }

  private assertToDoExistence(id: string): void
  {
    if (!this.todos.value.some(t => t.id === id))
    {
      throw new ToDoNotFoundException(id);
    }
  }
}
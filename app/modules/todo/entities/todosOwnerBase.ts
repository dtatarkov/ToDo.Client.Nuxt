import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDo } from "../interfaces/todo";
import type { ToDosRepository } from "../interfaces/todosRepository";
import type { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";
import { ToDoNotFoundException } from "../exceptions/toDoNotFoundException";
import { ObservableSource } from '@shared/entities/observableSource';
import type { Destroyable } from '@shared/interfaces/destroyable';
import type { Observable } from '@shared/interfaces/observable';
import type { SSRLoader } from '@shared/interfaces/ssrLoader';

export class ToDosOwnerBase extends ToDosOwner implements Destroyable
{
  protected todos = new ObservableSource(new Array<ToDo>());

  constructor(
    protected todosRepository: ToDosRepository,
    protected todoDtoMapper: ToDoDtoMapper,
    protected ssrLoader: SSRLoader
  )
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

  override async updateToDosAsync()
  {
    const todoDtos: ToDoGetDto[] = await this.ssrLoader.loadAsync('todos', () => this.todosRepository.getAllToDosAsync());
    const todos = todoDtos.map(todoDto => this.todoDtoMapper.mapToEntity(todoDto));

    this.todos.value = todos;
  }

  override async saveToDoAsync(todo: ToDo): Promise<void>
  {
    this.assertToDoExistence(todo.id);

    const updateDto = this.todoDtoMapper.mapToUpdateDto(todo);
    const updatedDto = await this.todosRepository.updateToDoAsync(todo.id, updateDto);
    const updatedTodo = this.todoDtoMapper.mapToEntity(updatedDto);

    this.assertToDoExistence(todo.id);

    // Replace the todo in the collection
    const newTodos = this.todos.value.map(t => t.id === todo.id ? updatedTodo : t);

    this.todos.value = newTodos;
  }

  private assertToDoExistence(id: string): void
  {
    if (!this.todos.value.some(t => t.id === id))
    {
      throw new ToDoNotFoundException(id);
    }
  }

  destroy()
  {
    this.todos.destroy();
  }
}
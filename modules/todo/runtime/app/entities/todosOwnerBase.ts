import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDo } from "../interfaces/todo";
import type { ToDosRepository } from "../interfaces/todosRepository";
import type { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";

export class ToDosOwnerBase extends ToDosOwner implements Destroyable
{
  protected todos = new ObservableBase(new Array<ToDo>());

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
    const todos                  = todoDtos.map(todoDto => this.todoDtoMapper.mapToEntity(todoDto));

    this.todos.value = todos;
  }

  destroy()
  {
    this.todos.destroy();
  }
}
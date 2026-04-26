import { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';
import { ToDosRepository } from "../interfaces/todosRepository";
import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import { ToDo } from "../interfaces/todo";
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDoGetDto } from '../types/toDoGetDto';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { SSRLoader } from '@/modules/shared/interfaces/ssrLoader';

@dependency(AppPublicRuntimeConfig)
@dependency(ToDoDtoMapper)
@dependency(SSRLoader)
export class ToDosRepositoryImpl extends ToDosRepository
{
  constructor(
    private config: AppPublicRuntimeConfig,
    private todoDtoMapper: ToDoDtoMapper,
    private ssrLoader: SSRLoader
  )
  {
    super();
  }

  override async getAllToDosAsync(): Promise<ToDo[]>
  {
    const dtos: ToDoGetDto[] = await this.ssrLoader.loadAsync('todos', () => $fetch(`${this.config.apiBaseUrl}/todos`, {
      method: 'GET',
      credentials: 'include'
    }));

    const todos = dtos.map(dto => this.todoDtoMapper.mapToEntity(dto));

    return todos;
  }

  override async saveToDoAsync(todo: ToDo): Promise<void>
  {
    const updateDto = this.todoDtoMapper.mapToUpdateDto(todo);

    const dto: ToDoGetDto = await $fetch(`${this.config.apiBaseUrl}/todos/${todo.id}`, {
      method: 'PUT',
      credentials: 'include',
      body: updateDto
    });

    const updatedTodo = this.todoDtoMapper.mapToEntity(dto);
    updatePropertiesWithData(todo, updatedTodo.getData());
  }
}
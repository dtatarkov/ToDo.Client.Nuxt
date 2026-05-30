import { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';
import { ToDosRepository } from "./todosRepository";
import { ToDoDtoMapper } from "../mappers/todoDtoMapper";
import type { ToDo } from "../entities/todo";
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

  override async addToDoAsync(todo: ToDo): Promise<void>
  {
    if (!todo.isNew)
    {
      throw new Error('todo is not new');
    }

    const addDto = this.todoDtoMapper.mapToAddDto(todo);

    const dto: ToDoGetDto = await $fetch(`${this.config.apiBaseUrl}/todos`, {
      method: 'POST',
      credentials: 'include',
      body: addDto
    });

    const addedToDo = this.todoDtoMapper.mapToEntity(dto);
    updatePropertiesWithData(todo, addedToDo.getData());
  }

  override async updateToDoAsync(todo: ToDo): Promise<void>
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
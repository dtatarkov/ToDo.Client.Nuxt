import { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';
import { ToDosRepository } from "../interfaces/todosRepository";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(AppPublicRuntimeConfig)
export class ToDosRepositoryImpl extends ToDosRepository
{
  constructor(
    private config: AppPublicRuntimeConfig
  )
  {
    super();
  }

  override getAllToDosAsync(): Promise<ToDoGetDto[]>
  {
    return $fetch(`${this.config.apiBaseUrl}/todos`, {
      method: 'GET',
      credentials: 'include'
    });
  }

  override updateToDoAsync(id: string, data: ToDoUpdateDto): Promise<ToDoGetDto>
  {
    return $fetch(`${this.config.apiBaseUrl}/todos/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data
    });
  }
}
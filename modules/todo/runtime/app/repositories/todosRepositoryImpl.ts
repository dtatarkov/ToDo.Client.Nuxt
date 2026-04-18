import { ToDosRepository } from "../interfaces/todosRepository";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";

export class ToDosRepositoryImpl extends ToDosRepository
{
  private config = useRuntimeConfig();

  getAllToDosAsync(): Promise<ToDoGetDto[]>
  {
    return $fetch(`${this.config.public.apiBaseUrl}/todos`, {
      method: 'GET',
      credentials: 'include'
    });
  }

  updateToDoAsync(id: string, data: ToDoUpdateDto): Promise<ToDoGetDto>
  {
    return $fetch(`${this.config.public.apiBaseUrl}/todos/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data
    });
  }
}
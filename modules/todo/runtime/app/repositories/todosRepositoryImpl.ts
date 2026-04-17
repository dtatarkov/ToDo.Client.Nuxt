import { ToDosRepository } from "../interfaces/todosRepository";
import type { ToDoGetDto } from "../types/toDoGetDto";

export class ToDosRepositoryImpl extends ToDosRepository
{
  private config = useRuntimeConfig();

  getAllToDosAsync(): Promise<ToDoGetDto[]>
  {
    return $fetch(`${ this.config.public.apiBaseUrl }/todos`, {
      method     : 'GET',
      credentials: 'include'
    });
  }
}
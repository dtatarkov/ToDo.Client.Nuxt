import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";

export abstract class ToDosRepository
{
  abstract getAllToDosAsync(): Promise<ToDoGetDto[]>;

  abstract updateToDoAsync(id: string, data: ToDoUpdateDto): Promise<ToDoGetDto>;
}
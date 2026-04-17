import type { ToDoGetDto } from "../types/toDoGetDto";

export abstract class ToDosRepository
{
  abstract getAllToDosAsync(): Promise<ToDoGetDto[]>;
}
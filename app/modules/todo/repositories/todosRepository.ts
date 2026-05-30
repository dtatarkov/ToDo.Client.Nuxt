import type { ToDo } from "../entities/todo";

export abstract class ToDosRepository
{
  abstract getAllToDosAsync(): Promise<ToDo[]>;

  abstract saveToDoAsync(todo: ToDo): Promise<void>;
}
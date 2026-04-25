import type { ToDo } from "./todo";

export abstract class ToDosRepository
{
  abstract getAllToDosAsync(): Promise<ToDo[]>;

  abstract saveToDoAsync(todo: ToDo): Promise<void>;
}
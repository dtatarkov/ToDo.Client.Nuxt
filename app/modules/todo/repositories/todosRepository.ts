import type { ToDo } from "../entities/todo";

export abstract class ToDosRepository
{
  abstract getAllToDosAsync(): Promise<ToDo[]>;
  abstract addToDoAsync(todo: ToDo): Promise<void>;
  abstract updateToDoAsync(todo: ToDo): Promise<void>;
}
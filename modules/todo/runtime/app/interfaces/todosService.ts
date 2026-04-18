import { ToDo } from "../interfaces/todo";
import type { Observable } from "@shared/interfaces/observable";

export abstract class ToDosService
{
  abstract getAllToDos(): Observable<ToDo[]>;

  abstract updateToDosAsync(): Promise<void>;

  abstract editToDoAsync(todoId: string): Promise<void>
}
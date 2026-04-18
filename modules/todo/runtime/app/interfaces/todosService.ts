import { ToDo } from "../interfaces/todo";

export abstract class ToDosService
{
  abstract getAllToDos(): Observable<ToDo[]>;

  abstract updateToDosAsync(): Promise<void>;

  abstract editToDoAsync(todoId: string): Promise<void>;
}
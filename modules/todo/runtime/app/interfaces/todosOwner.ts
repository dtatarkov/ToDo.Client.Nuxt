import { ToDo } from "../interfaces/todo";

export abstract class ToDosOwner
{
  abstract getAllToDos(): Observable<ToDo[]>;

  abstract updateToDosAsync(): Promise<void>;

  abstract getToDoById(id: string): ToDo | undefined;

  abstract saveToDoAsync(todo: ToDo): Promise<void>;
}
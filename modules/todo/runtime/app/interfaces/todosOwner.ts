import { ToDo } from "../interfaces/todo";
import type { Observable } from "@shared/interfaces/observable";

export abstract class ToDosOwner
{
  abstract getAllToDos(): Observable<ToDo[]>;

  abstract updateToDosAsync(): Promise<void>;

  abstract getToDoById(id: string): ToDo | undefined;
}
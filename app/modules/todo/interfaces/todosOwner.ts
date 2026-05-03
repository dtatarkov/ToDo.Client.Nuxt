import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDo } from "../interfaces/todo";

export abstract class ToDosOwner
{
  abstract getAllToDosAsync(): Promise<Observable<ToDo[]>>;
  abstract getAllToDos(): Observable<ToDo[]>;
  abstract getToDoByIdAsync(id: string): Promise<ToDo | undefined>;
  abstract updateToDosAsync(): Promise<void>;
  abstract initializeToDosAsync(): Promise<void>;
  abstract saveToDoAsync(todo: ToDo): Promise<void>;
  abstract createToDo(): ToDo;
}
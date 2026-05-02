import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDo } from "../interfaces/todo";

export abstract class ToDosOwner
{
  abstract getAllToDosAsync(): Promise<Observable<ToDo[]>>;
  abstract updateToDosAsync(): Promise<void>;
  abstract saveToDoAsync(todo: ToDo): Promise<void>;
  abstract createToDo(): ToDo;
}
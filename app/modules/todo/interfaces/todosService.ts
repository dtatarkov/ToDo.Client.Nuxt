import type { Observable } from '@/modules/shared/interfaces/observable';
import { ToDo } from "../interfaces/todo";

export abstract class ToDosService
{
  abstract getAllToDosAsync(): Promise<Observable<ToDo[]>>;
  abstract updateToDosAsync(): Promise<void>;
}